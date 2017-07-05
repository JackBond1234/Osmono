<?php
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}
    echo $this->Html->css("application/index", ["block" => "css"]);

    echo $this->Html->script("Application/Controller", ["block" => "script"]);
?>

<div ng-controller="applicationController" id="application-container">
    <div id="menu-bar">
        <div class="middle">Title</div>
        <div class="left">
            <?= $this->Html->image(
                    "hamburger.svg",
                    [
                        "class"=>"navBarButton",
                        "ng-class"=>"{'depressed':applicationDropDownExpanded}",
                        "ng-click"=>"toggleApplicationDropDown()",
                        "click-anywhere-but-here"=>"retractApplicationDropDown()"
                    ]
            ); ?>
        </div>
        <div class="right">
            <?= $this->Html->image(
                    "x.svg",
                    [
                        "class"=>"navBarButton hideOnDesktop",
                        "ng-click"=>"hideMobileApplication()"
                    ]
            ); ?>
            <?= $this->Html->image(
                    "expandLeftColumn.svg",
                    [
                        "class"=>"navBarButton ng-animate-disabled hideOnMobile",
                        "ng-show"=>"!expandApplicationColumn",
                        "ng-click"=>"expandDesktopApplication()"
                    ]
            ); ?>
            <?= $this->Html->image(
                    "retractLeftColumn.svg",
                    [
                        "class"=>"navBarButton ng-animate-disabled hideOnMobile",
                        "ng-show"=>"expandApplicationColumn",
                        "ng-click"=>"retractDesktopApplication()"
                    ]
            ); ?>
        </div>
    </div>
    <div id="body-container">
        <div id="body-content">
            <div ng-if='applicationViewToShow == "data"' id="data-view">
                <?= $this->element(
                    "module",
                    [
                        "UrlBuilderArray" =>
                        [
                            'prefix' => 'application',
                            'controller' => 'Data',
                            'action' => 'index'
                        ]
                    ]
                ); ?>
            </div>
            <div ng-if='applicationViewToShow == "distribute"' id="distribute-view">
                <?= $this->element(
                    "module",
                    [
                        "UrlBuilderArray" =>
                            [
                                'prefix' => 'application',
                                'controller' => 'Distribute',
                                'action' => 'index'
                            ]
                    ]
                ); ?>
            </div>
            <div ng-if='applicationViewToShow == "user-info"' id="user-info-view">
                <?= $this->element(
                    "module",
                    [
                        "UrlBuilderArray" =>
                            [
                                'prefix' => 'application',
                                'controller' => 'UserInfo',
                                'action' => 'index'
                            ]
                    ]
                ); ?>
            </div>
        </div>
        <div class="nav-bar-dropdown" ng-class="{'expanded':applicationDropDownExpanded}">
            <ul>
                <li ng-click="setApplicationView('data')">Data</li>
                <li ng-click="setApplicationView('distribute')">Distribute</li>
                <li ng-click="setApplicationView('user-info')">User Info</li>
            </ul>
        </div>
    </div>
</div>