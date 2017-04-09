<?
    echo $this->Html->css("main/index.css");

    echo $this->Html->script("jquery.js");
    echo $this->Html->script("angular.js");
    echo $this->Html->script("angular-animate.js");
    echo $this->Html->script("AngularApps.js");


    $ApplicationUrl = $this->Url->build(['controller' => 'Application', 'action' => 'index']);
    $CategoryUrl = "";
    $DetailUrl = "";
?>

<div ng-app="index">
    <div id="ApplicationColumn" class="MainColumn">
        <div ng-if="!ApplicationLoaded" style="text-align:center;margin-top:40px">Loading...</div>
        <div ng-include="'<?= $ApplicationUrl ?>'" onload="ApplicationLoaded=true"></div>
    </div>
    <div id="CategoryColumn" class="MainColumn"></div>
    <div id="DetailColumn" class="MainColumn"></div>
</div>