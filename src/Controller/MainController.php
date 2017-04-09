<?php

namespace App\Controller;

class MainController extends AppController {
    public function index(){
        $this->viewBuilder()->setLayout("main");
        //Sample stuff below
        $this->Users = $this->loadModel("users");
        $testvar = $this->Users->find("all");
        $this->set(compact("testvar"));
    }
}