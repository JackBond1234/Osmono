<?php
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}
    echo $this->Html->css("details/index", ["block" => "css"]);

    echo $this->Html->script("Details/DetailsController", ["block" => "script"]);
?>

<div ng-controller="detailsController" id="details-container">
    <div class="detail-outer-dup-wrapper"
         ng-repeat="detailWindow in detailWindows | orderBy:'index' track by detailWindow.id"
         ng-style="{'background-color':detailWindow.color}"
         pass-through-data="associateRepeatIndexWithDom(detailWindow.index, element)"
    >
        <div class="menu-bar">
            <div class="middle" ng-style="{'color':detailWindow.textColor}" ng-bind="detailWindow.name"></div>
            <div class="left">
                <img
                        ng-src="{{buildPath('img/hamburger_white.svg')}}"
                        class="navBarButton"
                        ng-class="{'depressed':detailWindow.detailDropDownExpanded}"
                        ng-click="toggleDetailDropDown(detailWindow)"
                        click-anywhere-but-here="retractDetailDropDown(detailWindow)"
                        ng-if="detailWindow.hasDarkBackground"
                />
                <img
                        ng-src="{{buildPath('img/hamburger_black.svg')}}"
                        class="navBarButton darkNavBarButton"
                        ng-class="{'depressed':detailWindow.detailDropDownExpanded}"
                        ng-click="toggleDetailDropDown(detailWindow)"
                        click-anywhere-but-here="retractDetailDropDown(detailWindow)"
                        ng-if="!detailWindow.hasDarkBackground"
                />
            </div>
            <div class="right">
                <img
                        ng-src="{{buildPath('img/x.svg')}}"
                        class="navBarButton"
                        ng-click="signalCloseDetail(detailWindow.index)"
                        ng-if="detailWindow.hasDarkBackground"
                />
                <img
                        ng-src="{{buildPath('img/x_black.svg')}}"
                        class="navBarButton"
                        ng-click="signalCloseDetail(detailWindow.index)"
                        ng-if="!detailWindow.hasDarkBackground"
                />
            </div>
        </div>
        <div class="body-container">
            <div id="body-content">
                <div class="detail-menu-view" ng-repeat="(detailMenuViewKey, detailMenuView) in detailMenuViews" ng-if="detailWindow['detailMenuViewToShow'] === detailMenuViewKey">
                    <?= $this->element('module', ['url' => "detailMenuView['url'] + '&categoryId='+detailWindow.id"]); ?>
                </div>
            </div>
            <div class="nav-bar-dropdown" ng-style="{'background-color':detailWindow.color}" ng-class="{'expanded':detailWindow.detailDropDownExpanded}">
                <ul>
                    <li ng-repeat="(detailMenuViewKey, detailMenuView) in detailMenuViews" ng-click="setDetailMenuView(detailMenuViewKey, detailWindow)">
                        <img ng-src="{{buildPath('img/'+(detailWindow.hasDarkBackground ? detailMenuView.images.standard : detailMenuView.images.dark))}}"/>
                        <div ng-style="{'color': detailWindow.textColor}" ng-bind="detailMenuView['name']"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>