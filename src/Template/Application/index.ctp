<?php
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}
    echo $this->Html->css("application/index", ["block" => "css"]);

    echo $this->Html->script("Application/ApplicationController", ["block" => "script"]);
?>

<div ng-controller="applicationController" id="application-container">
    <div class="menu-bar">
        <div class="middle" ng-bind="applicationViews[applicationViewToShow]['name']"></div>
        <div class="left">
            <img
                ng-src="{{buildPath('img/hamburger_white.svg')}}"
                class="navBarButton"
                ng-class="{'depressed':applicationDropDownExpanded}"
                ng-click="toggleApplicationDropDown()"
                click-anywhere-but-here="retractApplicationDropDown()"
            />
        </div>
        <div class="right">
            <img
                ng-src="{{buildPath('img/x.svg')}}"
                class="navBarButton hideOnDesktop"
                ng-click="hideMobileApplication()"
            />
            <img
                ng-src="{{buildPath('img/expandLeftColumn.svg')}}"
                class="navBarButton ng-animate-disabled hideOnMobile"
                ng-show="!expandApplicationColumn"
                ng-click="expandDesktopApplication()"
            />
            <img
                ng-src="{{buildPath('img/retractLeftColumn.svg')}}"
                class="navBarButton ng-animate-disabled hideOnMobile"
                ng-show="expandApplicationColumn"
                ng-click="retractDesktopApplication()"
            />
        </div>
    </div>
    <div id="body-container">
        <div id="body-content">
            <div class="application-view" ng-repeat="(applicationViewKey, applicationView) in applicationViews" ng-if="applicationViewToShow === applicationViewKey">
                <?= $this->element('module', ['url' => "applicationView['url']"]); ?>
            </div>
        </div>
        <div class="nav-bar-dropdown" ng-class="{'expanded':applicationDropDownExpanded}">
            <ul>
                <li ng-repeat="(applicationViewKey, applicationView) in applicationViews" ng-click="setApplicationView(applicationViewKey)">
                    <img ng-src="{{buildPath('img/'+applicationView.images.standard)}}"/>
                    <div ng-bind="applicationView['name']"></div>
                </li>
            </ul>
        </div>
    </div>
</div>