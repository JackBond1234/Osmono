<?php

namespace App\Controller;

//use TestsController;

class TestsController extends AppController {
    public function index(){
        $this->Users = $this->loadModel("users");
        $testvar = $this->Users->find("all");
        $this->set(compact("testvar"));
    }
}