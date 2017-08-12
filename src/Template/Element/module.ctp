<?
$UrlBuilderArray["?"] = ["moduleid" => uniqid()];

$Url = $this->Url->build($UrlBuilderArray);
?>
<div ng-if="!moduleIsLoaded('<?= $Url ?>')" class="Loading">Loading...</div>
<div class='module' data-url="<?= $Url ?>" ng-include="'<?= $Url ?>'"></div>