v4.0.28 β：音声素材の手動選択を廃止。参考音声20件の比較ページを追加。
# v4.0.22 β 検証方法

`python quality_lab/run_suite.py` でWAV波形・JavaScript・Chromium UIテストを実行します。実行結果は `quality_lab/suite-report.json` に記録されます。

`quality_lab/README.md` に音声条件、権利、動作条件、iPhone実機テストの限界を記載しました。

Web Speech APIは通常のブラウザー環境ではWAV直接入力に対応していません。この版ではWAVが実際に英文として認識されたことを検証していません。

v4.0.24 マイク使用中の最上段表示
- 音声認識開始で赤太字「マイクON中です。」が最上段へ表示されることを確認。
- 正常認識、通信エラー、手動停止で表示が消えることを確認。
- 最終認識結果受信後に abort() で終了要求し、Safari の onend を確認してから採点画面へ遷移します。
- Chromium の模擬音声認識・連続100回・人物3,375通り検証、および node verify.js の回帰テストを実施。
- iOSの物理マイク状態はWeb Speech APIから読めないため、実機のマイク使用ランプと一致することは未保証。

## v4.0.24 更新補足
- iOSのオレンジマイク表示との完全同期はWeb APIの制約上不可。赤表示はSpeechRecognitionの開始・終了イベントと連動。
- 終了イベントが来ない場合は『停止未確認』警告を維持。オレンジ表示は実機で確認が必要。

## v4.0.27 追加テスト
- `node verify.js`
- `python browser_tests.py`
- `python test_voice427.py`
- iPhoneの実音声品質、声の年齢・性別の正確性、実マイク解放は別途実機で確認してください。
