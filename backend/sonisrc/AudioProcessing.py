import numpy as np
import matplotlib.pyplot as plt
import scipy.io.wavfile as wavfile
import IPython.display as ipd
import scipy.io.wavfile as wavfile
import librosa

imgrespath = "sonisrc/imgfigres/"
audrespath = "sonisrc/audiores/"

def plot_fourier_mag(x,fs,res_string,compound=True):
    """
    Given audio samples and the sample rate, plot
    the magnitude of the Fourier transform of x with 
    the appropriate frequency labels
    Parameters
    ----------
    x: ndarray(N)
        The audio samples
    fs: int
        The sample rate in hz
    """
    xft = np.abs(np.fft.fft(x))
    freqs = np.fft.fftfreq(len(x), 1/fs)
    plt.plot(freqs, np.abs(xft))
    plt.xlabel("Frequency")
    plt.ylabel("Magnitude")
    if not compound:
        nres = makeimgstr("fouriermag" + res_string)
        plt.savefig(nres)
        return nres

def load_audio_mono(filename):
    """
    Load audio from a .wav file, mixing stereo 
    to mono if necessary
    Parameters
    ----------
    filename: string
        Path to file
    
    Returns
    -------
    fs: int
        Sample rate
    x: ndarray(N)
        Mono audio
    """
    fs, x = wavfile.read(filename)
    if len(x.shape) > 1:
        x = np.mean(x, 1)
    return fs, x

def get_frequency(note):
    return 440.0 * 2.0 *(2.0 **(float(note)/12.0))

def makeimgstr(res_string):
    return imgrespath + res_string + ".png"

def makewavstr(res_string):
    return audrespath + res_string + ".wav"

"""
//////////////////////////////////////////////////////////////
Comb Filters
//////////////////////////////////////////////////////////////
"""

def get_comb_sound(fs, params, makeplot = False):

    paths = []

    note = int(params["note"])
    duration = int(params["duration"])
    n_pulses = int(params["n_pulses"])
    n_samples = int(params["n_samples"])
    fmag_range = int(params["fmag_range"])

    freq = get_frequency(note)
    t = int(fs/freq) #period
    y = np.random.randn(fs*duration)
    h = np.zeros(t*n_pulses)
    h[0::t] = 1  ## Impulse response
    x = np.convolve(y, h)

    res_string = "CombFilter" + str(fs) + str(note) + str(duration) + str(n_pulses) + str(n_samples) + str(fmag_range)
    description = "Comb Filter: (fs = " + str(fs) + ") (Note = " + str(note) + ") (Duration = " + str(duration) + ") (Number Of Pulses = " + str(n_pulses) + ") (Make Plot = " + str(makeplot) + ")"

    if makeplot:
        description += " (Number of Samples = " + str(n_samples) + ") (Fourier Mag Range = " + str(fmag_range) + ")"
        plt.subplot(2, 1, 1)
        plt.plot(x[0:n_samples])
        plt.subplot(2, 1, 2)
        plot_fourier_mag(x, fs, res_string)
        plt.xlim([0, fmag_range])
        ip = makeimgstr(res_string)
        plt.savefig(ip)
        paths.append(ip)
    ap = makewavstr(res_string)
    wavfile.write(ap, fs, x)
    paths.append(ap)

    return res_string,description, paths


"""
//////////////////////////////////////////////////////////////
Waves
//////////////////////////////////////////////////////////////
"""

def make_sine_wave(fs, params, makeplot = False):

    paths = []

    note = int(params["note"])
    duration = int(params["duration"])

    freq = get_frequency(note)
    t = np.linspace(0, duration, duration*fs)
    y = np.sin(np.pi*freq*t);
    res_string = "SineWave" + str(fs) + str(note) + str(duration)
    description = "Sine Wave: (fs = " + str(fs) + ") (Note = " + str(note) + ") (Duration = " + str(duration) + ") (Make Plot = " + str(makeplot) + ")"

    if makeplot:
        plt.plot(t,y)
        plt.xlim([0,fs/freq*10])
        plt.xlabel("10 Cycles")
        ip = makeimgstr(res_string)
        plt.savefig(ip)
        paths.append(ip)
    ap = makewavstr(res_string)
    wavfile.write(ap, fs, y)
    paths.append(ap)
    return res_string, description, paths

def get_triangle_wave(fs, params, makeplot = False):

    paths = []

    note = int(params["note"])
    duration = int(params["duration"])

    freq = get_frequency(note)
    t = np.arange(fs*duration)
    x = np.mod(t,freq)
    res_string = "TriangleWave" + str(fs) + str(note) + str(duration)
    description = "Triangle Wave: (fs = " + str(fs) + ") (Note = " + str(note) + ") (Duration = " + str(duration) + ") (Make Plot = " + str(makeplot) + ")"

    if makeplot:
        plt.plot(t,x)
        plt.xlim([0,fs/freq*10])
        plt.xlabel("10 Cycles")
        ip = makeimgstr(res_string)
        plt.savefig(ip)
        paths.append(ip)
    ap = makewavstr(res_string)
    wavfile.write(ap, fs, x)
    paths.append(ap)
    return res_string, description, paths


def get_square_wave(fs, params, makeplot = False):

    paths = []

    note = int(params["note"])
    duration = int(params["duration"])

    freq = get_frequency(note)
    t = np.linspace(0, duration, duration * fs)
    y = np.sin(2*np.pi*freq*t)
    z = np.sign(y)

    res_string = "SquareWave" + str(fs) + str(note) + str(duration)
    description = "Square Wave: (fs = " + str(fs) + ") (Note = " + str(note) + ") (Duration = " + str(duration) + ") (Make Plot = " + str(makeplot) + ")"

    if makeplot:
        plt.plot(t,z)
        plt.xlim([0,fs/freq*10])
        plt.xlabel("10 Cycles")
        ip = makeimgstr(res_string)
        plt.savefig(ip)
        paths.append(ip)
    ap = makewavstr(res_string)
    wavfile.write(ap, fs, z)
    paths.append(ap)
    return res_string, description, paths

def get_sawtooth_wave(fs, params, makeplot=False):

    paths = []

    note = int(params["note"])
    duration = int(params["duration"])
    n_harmonics = int(params["n_harmonics"])

    freq = get_frequency(note)
    t = np.linspace(0, duration, duration*fs, False)
    y = np.zeros(fs*duration)
    for i in range(1,n_harmonics+1):
        coeff = (1/i)*(-1)**(i+1)
        y = y + coeff*np.sin(2*np.pi*freq*i*t)
    
    res_string = "SawtoothWave" + str(fs) + str(note) + str(duration) + str(n_harmonics)
    description = "Sawtooth Wave: (fs = " + str(fs) + ") (Note = " + str(note) + ") (Duration = " + str(duration) + ") (Number Of Harmonics = " + str(n_harmonics) + ") (Make Plot = " + str(makeplot) + ")"

    if makeplot:
        plt.plot(t,y)
        plt.xlim([0,fs/freq*10])
        plt.xlabel("10 Cycles")
        ip = makeimgstr(res_string)
        plt.savefig(ip)
        paths.append(ip)
    ap = makewavstr(res_string)
    wavfile.write(ap, fs, y)
    paths.append(ap)
    return res_string, description, paths

"""
//////////////////////////////////////////////////////////////
Music Statement
//////////////////////////////////////////////////////////////
"""

def get_convolved_audio(fs, params, makeplot = False):

    paths = []

    song_one = params["song_one"]
    song_two = params["song_two"]

    fs, x = load_audio_mono(song_one)
    fs, h = load_audio_mono(song_two)
    y = fftconvolve(x,h)
    y /= np.max(np.abs(y))

    res_string = "Convolution" + str(fs) + song_one + song_two
    description = "Convolution: (fs = " + str(fs) + ") (Song One = " + song_one + ") (Song Two = " + song_two + ")"

    ap = makewavstr(res_string)
    wavfile.write(ap, fs, x)
    paths.append(ap)
    return res_string, paths

"""
//////////////////////////////////////////////////////////////
Downsample Audio
//////////////////////////////////////////////////////////////
"""

def downsample_audio(fs, params, makeplot=False):

    name = params["name"]
    ds_fac = params["ds_fac"]

    fs, x = load_audio_mono(name)
    res_string = "DownSampling" + str(ds_fac) + name
    description = "Down Sampling: (Down Sample Factor = " + str(ds_fac) + ") (Name = " + name + ")"
    y = x[0::ds_fac]

    if makeplot:
        plt.subplot(2,1,1)
        plt.plot(x)
        plt.xlabel("Original Audio")
        plt.subplot(2,1,2)
        plt.plot(y)
        plt.xlabel("Downsampled Audio")
        ip = makeimgstr(res_string)
        plt.savefig(ip)
        paths.append(ip)
    ap = makewavstr(res_string)
    wavfile.write(ap, fs/ds_fac, x)
    paths.append(ap)
    return res_string, paths


"""
//////////////////////////////////////////////////////////////
Viterbi
//////////////////////////////////////////////////////////////
"""

# def viterbi_alg(sr,audio):

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """

# """
# //////////////////////////////////////////////////////////////

# //////////////////////////////////////////////////////////////
# """
    
