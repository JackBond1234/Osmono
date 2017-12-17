<?
    $this->Html->meta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0', ['block' => true]);

    echo $this->element('angularBridge');

    echo $this->Html->css([
            "main/index"
        ], ["block" => "css"]);

    echo $this->Html->script([
        "jquery",
        "angular.js",
        "angular-route.min",
        "angular-animate.min",
        "angular-touch",
        "AngularApps",
        "Main/Controller"
    ], ["block" => "script"]);


    $ApplicationUrl = ['controller' => 'Application', 'action' => 'index'];
    $CategoriesUrl = ['controller' => 'Categories', 'action' => 'index'];
    $DetailsUrl = ['controller' => 'Details', 'action' => 'index'];
?>

<div ng-app="index" ng-controller="mainController">
    <div id="DetailColumn" class="MainColumn" ng-class="{'showMobileDetailColumn':showMobileDetailColumn}">
        <?= $this->element('module', ['url' => "buildPath({controller: 'details', action: 'index'})"]); ?>
    </div>
    <div id="CategoryColumn" class="MainColumn">
        <?= $this->element('module', ['url' => "buildPath({controller: 'categories', action: 'index'})"]); ?>
    </div>
    <div id="ApplicationColumn" class="MainColumn" ng-class="{'slideInOutHorizontally':showApplicationColumn, 'expandToFullScreen':expandApplicationColumn}">
        <?= $this->element('module', ['url' => "buildPath({controller: 'application', action: 'index'})"]); ?>
    </div>
</div>