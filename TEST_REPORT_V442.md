# English Journey v4.0.42 β テスト結果

- `test_swipe_avatar442.py`：375×812、390×844で全検査PASS。38×38px正円背景、横移動、縦操作との区別、ポップアップ展開中の誤移動防止、JS例外なし。
- `browser_tests.py`：27/27 PASS。
- `test_journey431.py`：10/10 PASS。
- `test_popup432.py`：6/6 PASS。
- `test_compact433.py`：5/5 PASS。
- 例文・AI会話およびホームの比較基準スクリーンショット：6枚保存。
- 実機iPhone Safari/PWAのタッチ・マイク評価は未実施。自動テストはChromium模擬環境での動作確認。

## 再発防止判定
人物アイコンは画像要素の寸法だけでなく、CSS描画後の枠の高さ・幅の差、正円角丸、背景画像と切り抜き方式を測定する。スマホ幅の差異とマイク状態変化中の画面高さも確認。
