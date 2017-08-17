<?
$UrlBuilderArray["?"] = ["moduleid" => uniqid()];

$Url = $this->Url->build($UrlBuilderArray);
?>
<div ng-if="!moduleIsLoaded('<?= $Url ?>')" class="loading"><?= $this->Html->image('spinner.svg'); ?></div>
<div class='module' data-url="<?= $Url ?>" ng-include="'<?= $Url ?>'"></div>