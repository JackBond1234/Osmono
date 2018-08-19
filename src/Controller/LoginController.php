<?php

namespace App\Controller;

class LoginController extends AppController {
    public function index(){
        $this->viewBuilder()->setLayout("main");
    }

    public function login(){
        $this->autoRender = false;
        $response = $this->response->withType('application/json');
        return $response->withStringBody(json_encode([
            'success' => true,
            'username' => $this->request->getData('username'),
            'password' => $this->request->getData('password')
        ]));
    }
}