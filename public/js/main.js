$(document).ready(function() {
    initInfo();
    initMainContent();
    initWhaleWisdom();
});

function initInfo() {
    $('#info .block').click(function() {
        $(this).siblings().eq(0).addClass('active');
        $(this).removeClass('active');
    });
}

function initMainContent() {
    $(window).on('hashchange', function(){
        loadData();
    });
    
    if (window.location.hash == '') {
        window.location.hash = '#main-info';
    }
    
    loadData();
    
    function loadData() {
        var $loading = $('<img class="loading" src="/img/loading.gif">');
        var dataFor = window.location.hash.substr(1);
        
        $('#mainHeader .pageSwitcher').removeClass('sel');
        $('#mainHeader .pageSwitcher[href="#' + dataFor + '"]').addClass('sel');
        
        $('main').html($loading);
    
        setTimeout(function() {
            $('main').load('/include-html/' + dataFor + '.html'); 
        }, 333);
    }
}

function initWhaleWisdom() {
    var $div = $('#whaleWisdom');
    var $citate = $div.find('.citate');
    var $citateText = $citate.find('.text');
    var $cursor = $citate.find('.cursor');
    var $author = $div.find('.author');
    
    var citates = [
        {
            text: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
            author: 'Martin Golding'
        },
        {
            text: 'Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.',
            author: 'Linus Torvalds'
        },
        {
            text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
            author: 'Bill Gates'
        }
    ];
    
    var randomCitate = citates[Math.floor(Math.random() * citates.length)];
    var randomCitateTextChars =  randomCitate.text.split('');
    var typeTimer = setInterval(type, 70);

	function type() {
		if (randomCitateTextChars.length > 0) {
            
			$citateText.text(function(k, v) {
				return v + randomCitateTextChars.shift();
			});
		} else {
			clearTimeout(typeTimer);
            $author.text(randomCitate.author);
            $div.addClass('said');
			return false;
		}
	}
}
