<? if (isset($url)) :
    $moduleId = uniqid();
    $url .= "+'&moduleId=".$moduleId."'";
?>
<div ng-if="!moduleIsLoaded(<?= $url; ?>)" class='loading'>
    <img ng-src="{{buildPath('img/spinner.svg')}}"/>
</div>
<div class="module" data-url="{{<?= $url; ?>}}" ng-include="<?= $url; ?>"></div>

<? endif; ?>

<?
if (isset($UrlBuilderArray)) :
$UrlBuilderArray["?"] = ["moduleid" => uniqid()];

$Url = $this->Url->build($UrlBuilderArray);
?>
<div ng-if="!moduleIsLoaded('<?= $Url ?>')" class="loading"><?= $this->Html->image('spinner.svg'); ?></div>
<div class='module' data-url="<?= $Url ?>" ng-include="'<?= $Url ?>'"></div>
<? endif; ?>