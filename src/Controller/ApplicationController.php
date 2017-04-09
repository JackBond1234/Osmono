<?php

namespace App\Controller;

class ApplicationController extends AppController {
    public function index(){
        $this->viewBuilder()->setLayout("inner");
    }
}