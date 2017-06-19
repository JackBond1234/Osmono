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
        <div class="left"><?= $this->Html->image("hamburger.svg", ["class"=>"navBarButton", "ng-class"=>"{'depressed':applicationDropDownExpanded}", "ng-click"=>"expandApplicationDropDown()"]); ?></div>
        <div class="right">
            <?= $this->Html->image("x.svg", ["class"=>"navBarButton hideOnDesktop", "ng-click"=>"hideMobileApplication()"]); ?>
            <?= $this->Html->image("expandLeftColumn.svg", ["class"=>"navBarButton hideOnMobile", "ng-show"=>"!expandApplicationColumn", "ng-click"=>"expandDesktopApplication()"]); ?>
            <?= $this->Html->image("retractLeftColumn.svg", ["class"=>"navBarButton hideOnMobile", "ng-show"=>"expandApplicationColumn", "ng-click"=>"retractDesktopApplication()"]); ?>
        </div>
    </div>
    <div id="body-container">
        <div id="body-content">
            Application View
            This is the application view
            This view will display a number
            of different applications such as
            a data view for viewing charts related
            to a user's budget usage,
            and a distribution view
            for previewing how money will be
            distributed to each category.            Application View
            This is the application view
            This view will display a number
            of different applications such as
            a data view for viewing charts related
            to a user's budget usage,
            and a distribution view
            for previewing how money will be
            distributed to each category.            Application View
            This is the application view
            This view will display a number
            of different applications such as
            a data view for viewing charts related
            to a user's budget usage,
            and a distribution view
            for previewing how money will be
            distributed to each category.
            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category. <br>
        </div>
        <div class="nav-bar-dropdown" ng-class="{'expanded':applicationDropDownExpanded}">
            <ul>
                <li>Data</li>
                <li>Distribute</li>
                <li>User Info</li>
            </ul>
        </div>
    </div>
</div>