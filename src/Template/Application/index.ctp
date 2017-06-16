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
        <? // Implement a mobile interface switcher. Fix the CSS on this menu bar ?>
        <div class="middle">Title</div>
                                                                                            <!--Let's not use this toggle variable-->
        <div class="left"><?= $this->Html->image("hamburger.svg", ["class"=>"navBarButton", "ng-class"=>"{'depressed':toggle}", "ng-click"=>"toggle=!toggle"]); ?></div>
        <div class="right"><?= $this->Html->image("x.svg", ["class"=>"navBarButton", "ng-click"=>"hideMobileApplication()"]); ?>
            <?= $this->Html->image("expandLeftColumn.svg", ["class"=>"navBarButton", "ng-click"=>"hideMobileApplication()"]); ?></div>
    </div>
    <div id="body-container">
        <div ng-repeat="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category.
        </div>
    </div>
</div>