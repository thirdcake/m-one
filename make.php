<?php

$file = new SplFileObject(__DIR__ . '/raw.txt');
$file->setFlags(SplFileObject::READ_AHEAD | SplFileObject::SKIP_EMPTY | SplFileObject::DROP_NEW_LINE);
$data_map = new DataMap();
foreach ($file as $line) {
    $data = new Data($line);
    $data_map->insert($data);
}

file_put_contents(__DIR__ . '/m1.json', json_encode($data_map->toArray(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
//file_put_contents(__DIR__ . '/m1.json', json_encode($data_map->toArray()));

class Data
{
    public string $name;
    public string $copy;
    public int $year;
    public string $rank;
    public int $order;
    public int $final;

    public function __construct(string $line)
    {
        [$name, $copy, $order_string] = explode("\t", $line);
        $this->name = trim($name);
        $this->copy = trim($copy);
        $order_data = explode(' ', $order_string);
        $year = trim($order_data[0]);
        $this->year = (int) $year;
        $this->rank = str_contains($order_data[1], '優勝') ? '優勝' : $order_data[1];
        $order = $order_data[count($order_data)-1];
        $this->order = (int) str_replace('番', '', $order);
        $this->final = (str_contains($order_data[2], '最終'))
            ? (int) str_replace(['最終', '番'], ['', ''], $order_data[2])
            : -1;
    }
}

class DataMap
{
    public array $year;
    public array $name;
    public array $final;

    public function __construct()
    {
        $this->year = [];
        $this->name = [];
        $this->final = [];
    }

    public function insert(Data $data):void
    {
        // 年度入力
        if(!isset($this->year[$data->year])) {
            $this->year[$data->year] = [];
        }
        $this->year[$data->year][$data->order] = $data->name;

        // コンビ名入力
        if(!isset($this->name[$data->name])) {
            $this->name[$data->name] = [
                'name' => $data->name,
                'data' => [],
                'latest' => $data->year,
                'index' => 0,
            ];
        }
        $this->name[$data->name]['data'][] = [
            'copy' => $data->copy,
            'year' => $data->year,
            'rank' => $data->year . '年: ' . $data->rank,
            'order' => $data->order,
            'final' => $data->final,
        ];
        $this->name[$data->name]['latest'] = max($this->name[$data->name]['latest'], $data->year);

        // ファイナル入力
        if(!isset($this->final[$data->year])) {
            $this->final[$data->year] = [];
        }
        if($data->final > 0) {
            $this->final[$data->year][$data->final] = $data->name;
        }
    }

    public function toArray():array
    {
        $name_data = [];
        foreach($this->name as $data) {
            $name_data[] = $data;
        }
        return [
            'year' => $this->year,
            'name' => $name_data,
            'final' => $this->final,
        ];
    }
}
