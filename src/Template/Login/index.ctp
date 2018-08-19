<?php
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}
echo $this->Html->css([
    'login/index',
    'angular_material.min'
], ["block" => "css"]);

echo $this->Html->script([
    'jquery',
    'angular',
    'angular-route.min',
    'angular-animate.min',
    'angular-touch',
    'angular_aria.min',
    'angular_material.min',
    'AngularApps'
], ['block' => 'script']);
?>

<body>
    <?= $this->element('logo'); ?>
    <div id="login-box" ng-app="index">
        <div id="login-pad">
            <?= $this->element('Login/form'); ?>
        </div>
    </div>
</body>