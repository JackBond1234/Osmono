<?php

namespace App\Controller;

class DetailsController extends AppController {
    public function index(){
        $this->viewBuilder()->setLayout("inner");
    }
}