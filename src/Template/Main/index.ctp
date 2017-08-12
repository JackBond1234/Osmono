<?
    $this->Html->meta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0', ['block' => true]);

    echo $this->Html->css("main/index", ["block" => "css"]);

    echo $this->Html->script([
        "jquery",
        "angular.min",
        "angular-route.min",
        "angular-animate.min",
        "AngularApps",
        "Main/Controller"
    ], ["block" => "script"]);


    $ApplicationUrl = ['controller' => 'Application', 'action' => 'index'];
    $CategoriesUrl = ['controller' => 'Categories', 'action' => 'index'];
    $DetailsUrl = ['controller' => 'Details', 'action' => 'index'];
?>

<div ng-app="index" ng-controller="mainController">
    <div id="DetailColumn" class="MainColumn">
        <?= $this->element("module", ["UrlBuilderArray" => $DetailsUrl]); ?>
    </div>
    <div id="CategoryColumn" class="MainColumn">
        <?= $this->element("module", ["UrlBuilderArray" => $CategoriesUrl]); ?>
    </div>
    <div id="ApplicationColumn" class="MainColumn" ng-class="{'slideInOutHorizontally':showApplicationColumn, 'expandToFullScreen':expandApplicationColumn}">
        <?= $this->element("module", ["UrlBuilderArray" => $ApplicationUrl]); ?>
    </div>
</div>