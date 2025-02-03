<?php
namespace Core;

final class ResponseBody implements \JsonSerializable {
    public string $message;
    public $content;

    public function __construct(string $message="", $content=array()) {
        $this->message = $message;
        $this->content = $content;
    }

    public function jsonSerialize(): array {
        return [
            "message" => $this->message,
            "content" => $this->content
        ];
    }

}