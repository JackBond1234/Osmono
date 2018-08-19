<?php

echo $this->Html->css("home", ["block" => "css"]);
echo $this->Html->script(["jquery"], ["block" => "script"]);

$this->assign("title", "Osmono.com is under construction");

$this->Html->meta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0', ['block' => true]);

?>

<body>
    <?= $this->element('logo'); ?>
    <h2>This website is under construction</h2>
    <br><br>
    <div id="consider-donating">Consider donating to speed up development!&nbsp;
        <div class="tooltip">What is Osmono?
            <div class="tooltiptext">
                <p>Osmono is a powerful personal finance tool that makes it easy to not only track your budget, but also build your budget by setting your needs and limitations, and letting our technology do the work for you every time you earn or spend money.</p>
                <p>Other budgeting tools are hardly more useful than writing down your budget on a piece of paper; and tracking your budget in a spreadsheet would require an inordinate amount of effort to reach the kind of sophistication available with Osmono.</p>
                <hr>
                <p>I am currently developing Osmono in my free time as a hobby, however I plan to release Osmono as a complete web/mobile software package. When I'm not working on Osmono, I'm professionally developing web-based services for a highly successful human resources company.</p>
                <p>Today I use an early prototype of Osmono for my personal budget, and it works very well! However before it's ready for the public, it needs to be given a major polish, and new features need to be added.</p>
                <p>Every donation gives meaning to my work. To know that others are interested, as I am, in a smart, definitive personal finance solution would drive me to deliver the very best product I possibly can, just for you.</p>
                <p>Be sure to check back every so often for updates!</p>
            </div>
        </div>
    </div>
    <br>
    <?= $this->Html->image('Bitcoin_logo.svg', ["width" => "75"]); ?>
    <input id="bitcoin" type="text" value="1HwDwWWMeYRzMUQK2BfRJKFZdprrnezihe" size="36" readonly="readonly"/>
    <span style="opacity:0; position:absolute; font-weight:bold" id="copied-text">&nbsp;&nbsp;Copied!</span>
</body>

<script>
    $(document).ready(function(){
        $(".tooltip").on("click", function(){
            if ($(this).find(".tooltiptext").css("visibility") === "visible") {
                $(this).find(".tooltiptext").css("visibility", "hidden").css("opacity", "0");
            } else {
                $(this).find(".tooltiptext").css("visibility", "visible").css("opacity", "1");
            }
        });
        /**
         * @type int|undefined
         */
        var timeout = undefined;
        $("#bitcoin").click(function(){
            $(this).select();
            var successfulCopy = true;
            try {
                document.execCommand("copy");
            } catch (e) {
                successfulCopy = false;
            }
            if (successfulCopy) {
                var copiedText = $("#copied-text");
                copiedText.stop();
                if (typeof timeout !== "undefined") {
                    clearTimeout(timeout);
                }
                copiedText.css("opacity", "1");
                timeout = setTimeout(function() {
                    copiedText.animate({opacity: "0"}, 2000);
                }, 1000);
            }
        });
    });
</script>