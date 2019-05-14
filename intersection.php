<?
$array = Array();
$array[1] = $main_array = array ('a', 'b', 'c', 'd');
$size = sizeof($array[1]);
$arr_name = 1;
for ($count = 2; $count <= $size; $count++) {
  $this_size = sizeof($array[$arr_name]);
  $arr_name++;
  for ($i = 0; $i < $this_size; $i++) {
    $gg = $array[($arr_name-1)][$i];
    for ($x = 0; $x < $size; $x++) {
      $array[$arr_name][] = $gg . $array[1][$x];
    }
  }
  $main_array = array_merge($main_array, $array[$arr_name]);
  if ($arr_name > 2)
    unset($array[($arr_name-1)]);
  }
  unset($array[$arr_name]);
}
print_r($main_array);
?>
