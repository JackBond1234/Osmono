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
            <?= $this->Html->image(
                "plus.svg",
                [
                    "class"=>"navBarButton",
                    "ng-class"=>"{'depressed':applicationDropDownExpanded}",
                ]
            ); ?>
        </div>
        <div class="left">
            <?= $this->Html->image(
                "right_chevron.svg",
                [
                    "class"=>"navBarButton hideOnDesktop",
                    "ng-class"=>"{'depressed':applicationDropDownExpanded}",
                    "ng-click"=>"showApplication()"
                ]
            ); ?>
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
                 ng-style="{'background': '-webkit-linear-gradient(left, '+category.color+' 42px, white 42px)'}"
                 ng-mousedown="markCategoryAsClickHeld(categoryIndex, $event)"
                 ng-mouseup="markCategoryAsClickReleased()"
                 ng-touchend="markCategoryAsClickReleased()"
                 un-click-anywhere-but-here="markCategoryAsClickReleased()"
                 ng-mouseover="handleMoveCategoryRequest(categoryIndex, $event)"
                 ng-touchmove="handleMoveCategoryRequest(categoryIndex, $event)"
                 data-category-id="{{category.id}}"
            >
                <!-- TODO: Possibly extend ng-style to allow an array of values for one property, in order to support non-webkit browsers -->
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

<?php
/*
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}
    echo $this->Html->css("categories/index", ["block" => "css"]);

    echo $this->Html->script("Categories/Controller", ["block" => "script"]);
?>

<div ng-controller="categoriesController" id="categories-container">
    <div id="menu-bar">
        <? // Implement a mobile interface switcher. Fix the CSS on this menu bar ?>
        <div class="left">Btn</div>
        <div class="right">Btn</div>
<!--        <div class="middle">Title</div>-->
        <button class='middle' ng-click="showApplication()">ShowApplication</button>
    </div>
    <div id="body-container">
        <div ng-repeat="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
            Categories View <br>
            This is the categories view<br>
            This view will display a list<br>
            of different categories created by <br>
            the user along with the associated<br>
            balances of each category.<br>
            Here the user may click a category<br>
            for more details, or drag a category<br>
            to rearrange their priorities.
        </div>
    </div>
</div>*/