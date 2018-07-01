(function() {
  // Download locally
  function download(blob) {
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  const successCallback = (stream) => {
    // Set up the recorder
    let blobs = [];
    let recorder = new MediaRecorder(stream, {mimeType: 'video/webm; codecs=vp9'});
    recorder.ondataavailable = e => { if (e.data && e.data.size > 0) blobs.push(e.data)};
    recorder.onstop = (e) => download(new Blob(blobs, {type: 'video/webm'}));

    // Record for 10 seconds.
    setTimeout(()=> recorder.stop(), 10000);

    // Start recording.
    recorder.start(10); // collect 10ms chunks of data
  };

  const errorCallback = (err) => {
    // We don't have access to the API
    console.log(err)
  };

  navigator.getUserMedia({
    audio: false,
    video: {'mandatory': {'chromeMediaSource':'screen'}}
  }, successCallback, errorCallback);
})();


