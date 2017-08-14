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
        <div class="middle" ng-bind="applicationDisplayNameMap[applicationViewToShow]"></div>
        <div class="left">
            <?= $this->Html->image(
                    "hamburger_white.svg",
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
            <div ng-if='applicationViewToShow == "data"' class='application-view' id="data-view">
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
            <div ng-if='applicationViewToShow == "distribute"' class='application-view' id="distribute-view">
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
            <div ng-if='applicationViewToShow == "user-info"' class='application-view' id="user-info-view">
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
                <li ng-click="setApplicationView('data')"><?= $this->Html->image("data.svg"); ?><div ng-bind="applicationDisplayNameMap['data']"></div></li>
                <li ng-click="setApplicationView('distribute')"><?= $this->Html->image("distribute.svg"); ?><div ng-bind="applicationDisplayNameMap['distribute']"></div></li>
                <li ng-click="setApplicationView('user-info')"><?= $this->Html->image("userInfo.svg"); ?><div ng-bind="applicationDisplayNameMap['user-info']"></div></li>
            </ul>
        </div>
    </div>
</div>