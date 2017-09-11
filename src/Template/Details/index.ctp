<?php
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}
    echo $this->Html->css("details/index", ["block" => "css"]);

    echo $this->Html->script("Details/Controller", ["block" => "script"]);
?>

<div ng-controller="detailsController" id="details-container">
    <div class="detail-outer-dup-wrapper"
         ng-repeat="detailWindow in detailWindows | orderBy:'index'"
         ng-style="{'background-color':detailWindow.color}"
         pass-through-data="associateRepeatIndexWithDom(detailWindow.index, element)"
    >
        <div class="menu-bar">
            <? // Implement a mobile interface switcher. Fix the CSS on this menu bar ?>
            <div class="left">Btn</div>
            <div class="right">Btn</div>
            <div class="middle" ng-bind="detailWindow.name"></div>
        </div>
        <div class="body-container">
            <div ng-repeat="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
                Details View <br>
                This is the details view<br>
                This view will display one or more<br>
                windows representing categories. <br>
                Each window will contain a number <br>
                of possible views that give information <br>
                and provide commands and actions <br>
                for the user to perform on <br>
                the selected category.
            </div>
        </div>
    </div>
</div>