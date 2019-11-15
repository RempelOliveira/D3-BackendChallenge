<?php
	set_time_limit(0);

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET,OPTIONS");
	header("Access-Control-Allow-Headers: X-Requested-With");

	class Node
	{
		public $x;
		public $y;
		public $steps;

		public function __construct($x, $y, $steps)
		{
			$this->x = $x;
			$this->y = $y;
			$this->steps = $steps;

		}

	}

	class Logic
	{
		private $matrix  = [];
		private $visited = [];

		private function isValidPath($x, $y)
		{
			return $this->matrix[$x][$y] != 0 && $this->visited[$x][$y] !== true;

		}

		private function isUp($popedQueue)
		{
			return $this->isValidPath($popedQueue->x - 1, $popedQueue->y);

		}

		private function isDown($popedQueue)
		{
			return $this->isValidPath($popedQueue->x + 1, $popedQueue->y);

		}

		private function isLeft($popedQueue)
		{
			return $this->isValidPath($popedQueue->x, $popedQueue->y - 1);

		}

		private function isRight($popedQueue)
		{
			return $this->isValidPath($popedQueue->x, $popedQueue->y + 1);

		}

		public function getPath($data)
		{
			$source  = array_reverse($data["source"]);
			$destiny = $data["destiny"];

			$this->matrix =
				$data["matrix"];

			if($source[0] > count($this->matrix) - 1 || $source[1] > count($this->matrix[0]) - 1 || $this->matrix[$source[0]][$source[1]] != 1)
				return false;

			$map   = [$source];
			$queue = [new Node($source[0], $source[1], 0)];

			$this->visited 						   = array_fill(0, count($this->matrix), array_fill(0, count($this->matrix[0]), false));
			$this->visited[$source[0]][$source[1]] = true;

			while(!empty($queue))
			{
				$isPath     = false;
				$popedQueue = array_pop($queue);

				$map[$popedQueue->steps] =
					[$popedQueue->x, $popedQueue->y];

				if($this->matrix[$popedQueue->x][$popedQueue->y] == $destiny)
				{
					return ["source" => $source, "path" => array_slice($map, 0, $popedQueue->steps + 1), "position" => [$popedQueue->x, $popedQueue->y], "steps" => $popedQueue->steps];

				}
				else
				{

					if($this->isUp($popedQueue))
					{
						$this->visited[$popedQueue->x - 1][$popedQueue->y] = true;

						array_push(
							$queue, new Node($popedQueue->x - 1, $popedQueue->y, $popedQueue->steps + 1));

					}

					if($this->isDown($popedQueue))
					{
						$this->visited[$popedQueue->x + 1][$popedQueue->y] = true;

						array_push(
							$queue, new Node($popedQueue->x + 1, $popedQueue->y, $popedQueue->steps + 1));

					}

					if($this->isLeft($popedQueue))
					{
						$this->visited[$popedQueue->x][$popedQueue->y - 1] = true;

						array_push(
							$queue, new Node($popedQueue->x, $popedQueue->y - 1, $popedQueue->steps + 1));

					}

					if($this->isRight($popedQueue))
					{
						$this->visited[$popedQueue->x][$popedQueue->y + 1] = true;

						array_push(
							$queue, new Node($popedQueue->x, $popedQueue->y + 1, $popedQueue->steps + 1));

					}

				}

			}

			return false;

		}

	}

	if(strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest")
	{
		$Logic 	   = new Logic;
		$LogicPath = $Logic->getPath(array_map(json_decode, $_GET));

		echo json_encode($LogicPath);

	}
	else
		echo "Access Denied";

?>