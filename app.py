import os
from flask import Flask, render_template, send_from_directory
app = Flask(__name__, root_path='',
            template_folder="web/templates", static_url_path='')
google_maps_key = os.environ["GOOGLE_MAPS_KEY"]

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('web/static/js/', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('web/static/css/', path)


@app.route('/')
def index():
    return render_template('index.html', google_maps_key=google_maps_key)


if __name__ == "__main__":
    app.run(debug=True)
