<?php

class Dictionary
{
    private $words;

    public function __construct()
    {
        $dictionaryPath = 'dictionary.txt';

        if (!is_file($dictionaryPath)) {
            throw new Exception('Dictionary file is not found');
        }

        $wordsRaw = file_get_contents('dictionary.txt');
        $words = explode("\n", $wordsRaw);

        if (empty($words)) {
            throw new Exception('Dictionary is empty');
        }

        $this->words = $words;
        $this->sanitizeWords();
    }

    private function sanitizeWords()
    {
        foreach ($this->words as $k => $v) {
            $v = mb_strtolower($v, 'UTF-8');
            $v = preg_replace("/[^a-zA-Z0-9а-яё]+/u", "", $v);

            $this->words[$k] = $v;
        }
    }

    public function filterWords($length = 0)
    {
        if ($length > 0) {
            $this->words = array_filter($this->words, function($word) use ($length) {
                return mb_strlen($word, 'UTF-8') == $length;
            });
        }
    }

    public function containsWord($word)
    {
        return array_search($word, $this->words);
    }
}

$dictionary = new Dictionary();
$dictionary->filterWords(4);

var_dump($dictionary->containsWord('слон'));