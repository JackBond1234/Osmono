<?
$UrlBuilderArray["?"] = ["moduleid" => uniqid()];

$Url = $this->Url->build($UrlBuilderArray);
?>
<div ng-if="!moduleLoaded('<?= $Url ?>')" class="Loading">Loading...</div>
<div class='module' ng-include="'<?= $Url ?>'"></div>