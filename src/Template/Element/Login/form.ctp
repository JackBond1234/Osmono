<?php
    echo $this->Html->css("login/form", ["block" => "css"]);

echo $this->Html->script([
    'sha512',
    'Login/LoginController'
], ['block' => 'script']);
?>

<div ng-controller="loginController" layout="column" class="md-inline-form">
    <div id="login-form" ng-controller="loginController" layout="column" class="md-inline-form">
        <h1>Login</h1>
        <md-content layout-padding>
            <md-input-container id="email-container" class="md-block md-input-focused">
                <label for="email">Email</label>
                <input id="email" ng-model="email" type="text" autofocus="autofocus" ng-keyup="$event.keyCode == 13 && login()"/>
            </md-input-container>
        </md-content>
        <md-content layout-padding>
            <md-input-container id="password-container" class="md-block md-input-focused">
                <label for="password">Password</label>
                <input id="password" ng-model="password" type="password" ng-keyup="$event.keyCode == 13 && login()"/>
            </md-input-container>
        </md-content>
        <md-content class="button-layout">
            <md-button class="md-raised md-primary" ng-click="login()">Login</md-button>
        </md-content>
    </div>
</div>


