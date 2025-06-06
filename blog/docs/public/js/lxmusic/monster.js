/*!
 * @name monster🐱‍🐉
 * @description 哥斯拉vs大金刚
 * @version v1.5.5
 * @author 哥总
 *
 *
 */
(() => {
    "use strict";
    const {
        EVENT_NAMES: e,
        on: r,
        send: t,
        request: n,
        utils: o,
        version: a
    } = globalThis.lx, s = {
        buffer: {
            from: o.buffer.from,
            bufToString: o.buffer.bufToString
        },
        crypto: {
            aesEncrypt: o.crypto.aesEncrypt,
            md5: o.crypto.md5,
            randomBytes: o.crypto.randomBytes,
            rsaEncrypt: o.crypto.rsaEncrypt
        }
    }, l = {
        "128k": "128kmp3",
        "320k": "320kmp3",
        flac: "2000kflac",
        flac24bit: "4000kflac"
    }, d = e => s.crypto.md5(e);
    var i, A, u, p;
    i = e => ("" + e).replace(/[^\d.]+/g, e => "." + (e.replace(/[\W_]+/, "").toUpperCase().charCodeAt(0) - 65536) + ".").replace(/(?:\.0+)*(\.-\d+(?:\.\d+)?)\.*$/g, "$1").split(".");

    function E(t, o = "") {
        const i = Object.keys(t).sort();
        let a = "";
        return i.forEach((e, r) => {
            a += e + "=" + t[e], r != i.length - 1 && (a += o)
        }), a
    }
    const m = {
            "128k": 0,
            "320k": 1,
            flac: 2
        },
        D = {
            "128k": "standard",
            "320k": "exhigh",
            flac: "lossless",
            flac24bit: "hires"
        },
        f = (e, r) => {
            var t, o, i = `nobody${e="/"+e}use${text}md5forencrypt`,
                i = d(i),
                e = `${e}-${c}-${text}-${c}-` + i;
            return {
                params: (i = e, e = "e82ckenh8dichen8", t = "", o = "aes-128-ecb", a || (o = o.split("-").pop()), i = s.crypto.aesEncrypt(i, o, e, t), (a ? s.buffer.bufToString(i, "hex") : [...new Uint8Array(i)].map(e => e.toString(16).padStart(2, "0")).join("")).toUpperCase())
            }
        },
        B = {
            "128k": "PQ",
            "320k": "HQ",
            flac: "SQ",
            flac24bit: "ZQ"
        },
        C = {
            kw: {
                info: {
                    name: "酷我音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac", "flac24bit"]
                },
                async musicUrl({
                    songmid: e
                }, r) {
                    const i = `https://nmobi.kuwo.cn/mobi.s?f=web&source=kwplayer_ar_1.1.9_oppo_118980_320.apk&type=convert_url_with_sign&rid=${e}&br=` + (r = l[r]);
                    return new Promise((t, o) => {
                        n(i, {
                            method: "GET",
                            headers: {
                                "User-Agent": "okhttp/4.10.0"
                            }
                        }, (e, r) => e ? o(e) : 200 != r.body.code || 0 == r.body.data.bitrate ? o(new Error("failed")) : void t(r.body.data.url.split("?")[0]))
                    })
                }
            },
            kg: {
                info: {
                    name: "酷狗音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k"]
                },
                musicUrl({
                    hash: i,
                    albumId: a
                }, e) {
                    return new Promise((t, o) => {
                        var e = d(i + "57ae12eb6890223e355ccfcb74edf70d10051234560"),
                            e = {
                                album_id: a,
                                userid: 0,
                                area_code: 1,
                                hash: i,
                                module: "",
                                mid: 123456,
                                appid: "1005",
                                ssa_flag: "is_fromtrack",
                                clientver: "10086",
                                vipType: 6,
                                ptype: 0,
                                token: "",
                                auth: "",
                                mtype: 0,
                                album_audio_id: 0,
                                behavior: "play",
                                clienttime: Math.floor(Date.now() / 1e3),
                                pid: 2,
                                key: e,
                                dfid: "-",
                                pidversion: 3001,
                                quality: "128"
                            },
                            r = d("OIlwieks28dk2k092lksi2UIkp" + E(e) + "OIlwieks28dk2k092lksi2UIkp"),
                            e = "https://gateway.kugou.com/v5/url?" + E(e, "&") + "&signature=" + r;
                        n(e, {
                            method: "GET",
                            headers: {
                                "User-Agent": "Android712-AndroidPhone-8983-18-0-NetMusic-wifi",
                                "KG-THash": "3e5ec6b",
                                "KG-Rec": "1",
                                "KG-RC": "1",
                                "x-router": "tracker.kugou.com"
                            }
                        }, (e, r) => {
                            return e ? o(e) : 1 !== (e = r.body).status ? o(new Error(e.err_code)) : void t(r.body.url[0])
                        })
                    })
                }
            },
            tx: {
                info: {
                    name: "企鹅音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac"]
                },
                musicUrl({
                    songmid: e
                }, r) {
                    return new Promise((t, o) => {
                        n("https://md.khkj.xyz/qq/?type=song", {
                            method: "POST",
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Linux; Android 10; NOH-AN01 Build/HUAWEINOH-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.93 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/36.0)",
                                Connection: "Keep-Alive",
                                "Accept-Encoding": "gzip",
                                "Content-Type": "application/x-www-form-urlencoded",
                                DNT: "1",
                                "Sec-GPC": "1"
                            },
                            body: "mid=" + e + "&pmid=" + e + "&q=" + m[r]
                        }, (e, r) => {
                            return console.log(JSON.stringify(r.body, "", "  ")), e ? o("failed") : (e = r.body.data, 200 == r.body.code && e.purl ? void t(e.purl) : o(new Error("failed")))
                        })
                    })
                }
            },
            wy: {
                info: {
                    name: "网易音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac", "flac24bit"]
                },
                musicUrl({
                    songmid: e
                }, r) {
                    r = D[r];
                    r = "api/song/enhance/player/url/v1";
                    JSON.stringify([e]);
                    const i = f(r);
                    return new Promise((t, o) => {
                        n("https://interface.music.163.com/eapi/song/enhance/player/url/v1", {
                            method: "POST",
                            form: i,
                            headers: {
                                cookie: "EVNSM=1.0.0; versioncode=9000025; buildver=240205104600; ntes_kaola_ad=1; mobilename=sukiseki; osver=13; MUSIC_U=00C0AB8A13333D8FE277B703A2CFBBE280982A63BCFAE1D947FC3C53C5A069A56D333FE23DD3FFB95C10F811493A4070519F5A0511EBE5F2C032BF6E1F7508803007439BE7625982E5DCC0F9AEA729EE9A0084994199221E1159F0D7D63F26D2321C1AC656B9B219A9C19B0A19107EC4EA492A07896BCE24A05002646926C3A628AC6014EDF1B53946766EE920C57FCD74BF6E2B336B843B1B1E11D78DB53472AFB2CBBB6644D8BD9BE5B72CD70E699B4E63356A13DD1B9D99C40EA784FF163D3CA0F50377D738E9A07604D9C0205FB3227C55D2644E538226DA1D2770BD81CA7C90C4632A01FD837E6EA0D8E7B46086AB762C40B5257BE231552163CDAA8A24DE5DE490CFD33A401D890A73D7ACB7062F533824A42480B3772D4564718629D8B64014D8B2C2E8A46F8FE8A7DA698DAA39C9931007AE795485D1EC49C4B66BC26A47D66C0E455697B1350140DC334191DB4D3EB22EA55B25869A421F90480C64F55E0912BCB766D14BC05E8AA5C487A197AF4D3855D06710C91BE28281A00E20DF; os=android; channel=bubugao1; appver=9.0.25; packageType=release"
                            }
                        }, (e, r) => {
                            return e ? o(e) : ({
                                url: e,
                                freeTrialInfo: r
                            } = r.body.data[0], !e || r ? o(new Error("failed")) : void t(e))
                        })
                    })
                }
            },
            mg: {
                info: {
                    name: "咪咕音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac", "flac24bit"]
                },
                musicUrl(e, r) {
                    r = B[r], console.log(e);
                    const t = `https://app.c.nf.migu.cn/MIGUM2.0/strategy/listen-url/v2.4?netType=01&resourceType=E&songId=${e.copyrightId}&toneFlag=` + r;
                    return new Promise((o, i) => {
                        console.log(r), n(t, {
                            method: "GET",
                            headers: {
                                channel: "014000D",
                                token: "848401000134020058524459344E544130526A4932517A55344D7A56434E55453240687474703A2F2F70617373706F72742E6D6967752E636E2F6E303030312F4062393662376634326336326434303935393366666433366434313939393033300300040298EAFB0400063232303032340500164D4759355A4463784D324E684E4449324F57566B4E51FF0020795263B9A333A4580E13DD7F28820A8B9788F30062F6025FA08BF10CC5A8AA04",
                                aversionid: "DF94898993A5A28A64968A9FD0ADA0749397878BC39DD7BC68C584A1BAAFC96EC5938D8D8ED1A490949A8F9EB680997296DFD0D391D6ABBC69928AD0B57D99779CC8B88CDDECEE89628F89A1827E986F94978AD392A7A2916A928AA4878199779C"
                            }
                        }, (e, r) => {
                            if (e) return i(e);
                            let t = r.body.data?.url;
                            if (!t) return i(new Error("failed"));
                            t.startsWith("//") && (t = "https:" + t), o(t.replace(/\+/g, "%2B").split("?")[0])
                        })
                    })
                }
            }
        };
    var y, k, F = globalThis.lx["currentScriptInfo"],
        b = (r(e.request, ({
            source: e,
            action: r,
            info: t
        }) => {
            if ("musicUrl" === r) return C[e].musicUrl(t.musicInfo, t.type).catch(e => Promise.reject(e))
        }), {});
    for ([y, k] of Object.entries(C)) b[y] = k.info;
    t(e.inited, {
        status: !0,
        openDevTools: !1,
        sources: b
    })
})();
