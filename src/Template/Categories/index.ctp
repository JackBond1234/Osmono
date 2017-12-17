<?php
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}
echo $this->Html->css("categories/index", ["block" => "css"]);

echo $this->Html->script("Categories/Controller", ["block" => "script"]);
?>

<div ng-controller="categoriesController" id="categories-container">
    <div id="menu-bar">
        <div class="middle">
            <img
                ng-src="{{buildPath('img/plus.svg')}}"
                class="navBarButton"
            />
        </div>
        <div class="left">
            <img
                ng-src="{{buildPath('img/right_chevron.svg')}}"
                class="navBarButton hideOnDesktop"
                ng-click="showApplication()"
            />
        </div>
        <div class="right">
            <div id="balance">Balance:</div>
            <div id="balance-amount">$1,000,000.00</div>
        </div>
    </div>
    <div id="body-container">
        <div id="body-content">
            <div class="loading"><?= $this->Html->image('spinner.svg', ['ng-if' => '!categoriesLoaded']); ?></div>
            <div class='categories-tag'
                 ng-repeat="(categoryIndex, category) in categories"
                 ng-style-array="buildDynamicCategoryTagStyle(category.color)"
                 ng-class="{'selected-category': categoriesWithOpenDetails.indexOf(category.id) > -1}"
                 ng-mousedown="markCategoryAsClickHeld(categoryIndex, $event)"
                 ng-mouseup="markCategoryAsClickReleased()"
                 ng-touchend="markCategoryAsClickReleased()"
                 un-click-anywhere-but-here="markCategoryAsClickReleased()"
                 ng-mouseover="handleMoveCategoryRequest(categoryIndex, $event)"
                 ng-touchmove="handleMoveCategoryRequest(categoryIndex, $event)"
                 data-category-id="{{category.id}}"
            >
                <table class="category-tag-data">
                    <tr>
                        <td class="category-grip-container">
                            <img ng-src="<?= $this->Url->build('/img/grip.svg'); ?>"
                                 class="category-grip"
                                 ng-touchstart="markCategoryAsClickHeld(categoryIndex, $event)"
                                 draggable="false"
                            />
                        </td>
                        <td class="category-name"><div class="category-name-container" ng-bind="'&nbsp;'+category.name"></div></td>
                        <td class="category-balance" ng-bind="'&nbsp;&nbsp;'+(category.balance|currency)"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>