<?php
	set_time_limit(0);

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET,OPTIONS");
	header("Access-Control-Allow-Headers: X-Requested-With");

	class WebCrawler
	{
		private $htmls   = [];
		private $invalid = [];

		private $domain;
		private $scheme;

		function __construct($domain)
		{
			$this->domain = substr($domain, -1) == "/" ? substr($domain, 0, -1) : $domain;
			$this->scheme = parse_url($domain)["scheme"] . ":";

		}

		private function getHtmls($urls)
		{
			$htmls	   = [];
			$curlMulti = curl_multi_init();

			foreach($urls AS $url)
			{
				$curls[$url] = curl_init();

				curl_setopt($curls[$url], CURLOPT_URL, $url);
				curl_setopt($curls[$url], CURLOPT_HEADER, false);
				curl_setopt($curls[$url], CURLOPT_RETURNTRANSFER, true);
				curl_setopt($curls[$url], CURLOPT_TIMEOUT, 120);
				curl_setopt($curls[$url], CURLOPT_SSL_VERIFYPEER, false);

				curl_multi_add_handle($curlMulti, $curls[$url]);

			}

			$index = null;

			do
			{
				curl_multi_exec($curlMulti, $index);

			} while($index > 0);

			foreach($curls AS $i => $curl)
			{
				$httpCode    = curl_getinfo($curl, CURLINFO_HTTP_CODE);
				$contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);

				$this->htmls[$i] =
				[
					"httpCode" 	  => $httpCode,
					"contentType" => $contentType,
					"content" 	  => curl_multi_getcontent($curl)

				];

				curl_multi_remove_handle($curlMulti, $curl);

			}

			curl_multi_close($curlMulti);

		}

		private function getAssets($dom)
		{
			$styles  = [];
			$scripts = [];
			$images  = [];
			$favicon = "";

			foreach($dom->getElementsByTagName("link") AS $style)
			{
				if(strtolower($style->getAttribute("rel")) == "stylesheet")
				{
					$href = $style->getAttribute("href");

					if(substr($href, 0, 2) == "//")
					{
						$href = $this->scheme . $href;

					}
					else if(strpos($href, "http") === false)
						$href = $this->domain . (substr($href, 0, 1) != "/" ? "/" : "") . $href;

					array_push($styles, $href);

				}

			}

			foreach($dom->getElementsByTagName("style") AS $style)
			{
				array_push($styles, "<style>\n" . trim($style->nodeValue) . "\n</style>");

			}

			foreach($dom->getElementsByTagName("script") AS $i => $script)
			{
				$src = $script->getAttribute("src");

				if(empty($src))
				{
					$src = "<script>\n" . trim($script->nodeValue) . "\n</script>";

				}
				else
				{
					if(substr($src, 0, 2) == "//")
					{
						$src = $this->scheme . $src;

					}
					else if(strpos($src, "http") === false)
						$src = $this->domain . (substr($src, 0, 1) != "/" ? "/" : "") . $src;

				}

				array_push
				(
					$scripts, $src);

			}

			foreach($dom->getElementsByTagName("link") AS $style)
			{
				if(strpos(strtolower($style->getAttribute("rel")), "icon") !== false)
				{
					$href = $style->getAttribute("href");

					if(substr($href, 0, 2) == "//")
					{
						$href = $this->scheme . $href;

					}
					else if(strpos($href, "http") === false)
						$href = $this->domain . (substr($href, 0, 1) != "/" ? "/" : "") . $href;

					array_push($images, $href);

				}

			}

			foreach($dom->getElementsByTagName("img") AS $image)
			{
				$src = $image->getAttribute("src");

				if(substr($href, 0, 2) == "//")
				{
					$src = $this->scheme . $src;

				}
				else if(strpos($src, "http") === false)
					$src = $this->domain . (substr($src, 0, 1) != "/" ? "/" : "") . $src;

				array_push($images, $src);

			}

			return
			[
				"styles"  => $styles,
				"scripts" => $scripts,
				"images"  => $images

			];

		}

		public function getMap()
		{
			$queue[$this->domain] = $this->domain;

			$visited = [];
			$invalid = [];

			while(!empty($queue))
			{
				$this->getHtmls($queue);

				foreach($this->htmls AS $url => $html)
				{
					unset($queue[$url]);

					if(!in_array($url, $visited))
					{
						if($html["httpCode"] != 200 || strpos($html["contentType"], "text/html") === false)
						{
							array_push(
								$invalid, $url);

							continue;

						}

						$dom = new domDocument;
						$dom->preserveWhiteSpace = false;

						@$dom->loadHTML($html["content"]);

						array_push(
							$visited, $url);

						foreach($dom->getElementsByTagName("a") AS $tag)
						{
							$href = str_replace("./", "/", $tag->getAttribute("href"));

							if(strpos($href, "#") !== false)
								continue;

							if($this->domain . $href != $this->domain . "/")
							{
								if(strpos($href, "http") === false)
								{
									$href = $this->domain . $href;

									if(!in_array($href, $visited))
										$queue[$href] = $href;

								}
								else if(strpos($href, $this->domain) !== false)
								{
									if(!in_array($href, $visited))
										$queue[$href] = $href;

								}

							}

						}

					}

				}

			}

			foreach($this->htmls AS $url => $html)
			{
				if(!in_array($url, $invalid))
				{
					$dom = new domDocument;
					$dom->preserveWhiteSpace = false;

					@$dom->loadHTML($html["content"]);

					$this->map[$url] =
						$this->getAssets($dom);

				}

			}

			return $this->map;

		}

	}

	if(strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest")
	{
		$webCrawler    = new WebCrawler(trim($_GET["domain"]));
		$webCrawlerMap = $webCrawler->getMap();

		echo json_encode
		(
			!empty($webCrawlerMap) ? $webCrawlerMap : ["error" => true, "message" => "Invalid domain or internal error!"]

		);

	}
	else
	{
		if(strtolower($_SERVER["REQUEST_METHOD"]) == "get")
			header("Location: " . parse_ini_file(".env")["REACT_APP_URI"]);

	}

?>