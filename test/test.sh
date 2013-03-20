cd ..
./build.sh
cd test
./to_json.js test.drews_lang code > test.drews_lang.js
cat ../drews_lang.js test.drews_lang.js test.js > _tmp_test_file.js
node _tmp_test_file.js
