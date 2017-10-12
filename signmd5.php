<?php

   if(isset($_POST['data'])){

   $s=$_POST['data'];

      
     echo  strtoupper(md5($s));
 }


?>