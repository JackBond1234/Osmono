<?
    echo $this->Html->css("main/index", ["block" => "css"]);

    echo $this->Html->script([
        "jquery",
        "angular",
        "angular-animate",
        "AngularApps"
    ], ["block" => "script"]);


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