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
                "hamburger_black.svg",
                [
                    "class"=>"navBarButton",
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
            <table ng-repeat="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" style="width: 100%; border: solid 1px; margin-bottom: 10px;">
                <tr style="height:40px; font-size: 17px;">
                    <td style="background-color:red">X</td>
                    <td>Category {{i}}</td>
                    <td style="text-align:right">$100.00</td>
                </tr>
            </table>
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