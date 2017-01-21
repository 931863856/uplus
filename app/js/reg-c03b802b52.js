;(function(e) {
    	// console.log(e)
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(i.exports, i, i.exports, t),
        i.loaded = !0,
        i.exports
    }
    var n = {};
    return t.m = e,t.c = n,t.p = "",t(0);
})({
    0 : function(e, t, n) {
        var r;
        r = function(e, t) {
            var r = n(65),
            i = n(15),
            o = n(66);
            o.init();
            var a = $(".fields"),
            s = {
                name: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "请输入昵称"
                    }
                },
                phone: {
                    rules: {
                        required: !0,
                        type: "phone"
                    },
                    message: {
                        required: "请输入手机号",
                        type: "请输入正确的手机号"
                    }
                },
                code: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "请输入验证码"
                    }
                },
                password: {
                    rules: {
                        required: !0,
                        minLength: 6,
                        maxLength: 20
                    },
                    message: {
                        required: "请输入密码",
                        minLength: "请输入至少6个字符",
                        maxLength: "最多允许20个字符"
                    }
                },
                company: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "请输入公司名称"
                    }
                },
                job: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "请输入职位"
                    }
                },
                site: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "请输入站点名称"
                    }
                },
                feedback: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "内容不能为空"
                    }
                },
                industry: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "请输入行业名称"
                    }
                },
                province: {
                    rules: {
                        required: !0
                    },
                    message: {
                        required: "请选择省份"
                    }
                },
                town: {
                    rules: {
                        required: !0,
                    },
                    message: {
                        required: "请选择市区"
                    }
                },
                block: {
                    rules: {
                        required: !0,
                    },
                    message: {
                        required: "请选择县/镇"
                    }
                },
                mail: {
                    rules: {
                        required: !0,
                        match: function(){
				            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				            var mail = $("input[name=mail]");
				            var v = mail.val();
					        return reg.test(v); 
				        }
                    },
                    message: {
                        required: "请输入邮箱地址",
                        match: "邮箱格式不正确"
                    }
                },
                confirm: {
                    rules: {
                        required: !0,
                        match: function() {
                            return $("input[name=password]").val() == $("input[name=confirm]").val()
                        }
                    },
                    message: {
                        required: "请输入确认密码",
                        match: "两次密码输入不一致"
                    }
                }
            },
            c = new r(a, s),
            u = 0,
            f = null,
            l = !1;
            $("#fetch-code").on("click",
            function() {
                if (c.validate("phone")) {
                    var e = $(this);
                    if (0 != u || l) return;
                    l = !0,
                    e.text("发送中.."),
                    i.post("/api/reg/send_sms_code", {
                        phone: $("input[name=phone]").val()
                    }).then(function() {
                        l = !1,
                        u = 60,
                        f = setInterval(function() {
                            u--,
                            e.text("已发送(" + u + ")"),
                            0 == u && (e.text("获取验证码"), clearInterval(f))
                        },
                        1e3)
                    }).fail(function() {
                        l = !1,
                        e.text("获取验证码")
                    })
                }
            });
            var d = !1;
            $("#submit").on("click",
            function() {
                if (!d && c.validate()) {
                    d = !0;
                    var e = $("#main-form").serializeArray(),
                    t = {};
                    $.each(e,
                    function() {
                        t[this.name] = this.value
                    }),
                    i.post("/api/reg/submit", t).then(function(e) {
                        location.href = e.data.next
                    }).always(function() {
                        d = !1
                    })
                }
            })
        }.call(t, n, t, e),
        !(void 0 !== r && (e.exports = r))
    },
    15 : function(e, t, n) {
        var r;
        r = function() {
            var e = {};
            return e.post = function(e, t, n) {
                var r = {
                    url: e,
                    data: t,
                    method: "post",
                    dataType: "json",
                    cache: !1,
                    timeout: 45e3
                },
                i = $.Deferred();
                return $.ajax(r).fail(function() {
                    n !== !1 && $.alert("处理失败"),
                    i.reject()
                }).then(function(e) {
                    var t = e.code;
                    if (0 === t) i.resolve(e);
                    else if (2 === t) {
                        var n = e.msg;
                        n && $.confirm(n).then(function() {
                            $.loginWindow()
                        }),
                        i.reject()
                    } else {
                        var n = e.msg;
                        n && $.toast(n),
                        i.reject()
                    }
                }),
                i
            },
            e.loadHtml = function(e, t) {
                var n = {
                    url: e,
                    data: t,
                    method: "get",
                    dataType: "html",
                    cache: !1
                },
                r = $.Deferred();
                return $.ajax(n).fail(function() {
                    $.alert("加载失败")
                }).then(function(e) {
                    r.resolve(e)
                }),
                r
            },
            e
        }.call(t, n, t, e),
        !(void 0 !== r && (e.exports = r))
    },
    18 : function(e, t, n) {
        var r;
        r = function(e, t) {
            t.isWeixin = function() {
                var e = window.navigator.userAgent.toLowerCase();
                return "micromessenger" == e.match(/MicroMessenger/i)
            },
            t.isMobile = function() {
                var e = window.navigator.userAgent,
                t = ["Android", "iPhone", "iPod", "iPad", "Windows Phone", "BlackBerry", "MQQBrowser"];
                if (e.indexOf("Windows NT") < 0 && e.indexOf("Macintosh") < 0) for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (e.indexOf(r) >= 0) return ! 0
                }
                return ! 1
            },
            t.isFirefox = function() {
                return navigator.userAgent.indexOf("Firefox") > 0
            },
            t.isMac = function() {
                var e = navigator.platform;
                return e.toLowerCase().indexOf("mac") >= 0
            }
        }.call(t, n, t, e),
        !(void 0 !== r && (e.exports = r))
    },
    65 : function(e, t, n) {
        var r;
        r = function() {
            var e = function(e, t) {
                this.container = e,
                this.options = t
            };
            return e.prototype.tipError = function(e, t) {
                var n = this.container,
                r = n.find("[name=" + e + "]");
                r.nextAll(".error").show().text(t),
                r.addClass("item-error"),
                r.on("focus.validate",
                function() {
                    $(this).removeClass("item-error").off("focus.validate")
                })
            },
            e.prototype.validate = function(e) {
                var t = this.options,
                n = this.container;
                if (n.find(".error").hide(), n.find(".item-error").removeClass("item-error"), null != e) {
                    $.isArray(e) || (e = [e]),
                    t = {};
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        t[i] = this.options[i]
                    }
                }
                var o = 0;
                for (var i in t) {
                    var a = t[i],
                    s = n.find("[name=" + i + "]");
                    if (0 != s.length && !s.is(":hidden")) {
                        var c = null,
                        u = s.val(),
                        f = a.rules;
                        for (var l in f) if ($.isFunction(f[l])) {
                            var d = f[l]();
                            if (!d) {
                                c = l;
                                break
                            }
                        } else {
                            if ("required" == l && "" == $.trim(u)) {
                                c = l;
                                break
                            }
                            if ("type" == l) {
                                var p = f.type;
                                if ("phone" == p) {
                                    var h = /^(1[0-9])\d{9}$/gi;
                                    if (11 != u.length || !h.test(u)) {
                                        c = l;
                                        break
                                    }
                                }
                            }
                            if ("minLength" == l && u.length < f.minLength) {
                                c = l;
                                break
                            }
                            if ("maxLength" == l && u.length > f.maxLength) {
                                c = l;
                                break
                            }
                        }
                        null != c && (o++, this.tipError(i, a.message[c]))
                    }
                }
                return 0 == o
            },
            e
        }.call(t, n, t, e),
        !(void 0 !== r && (e.exports = r))
    },
    66 : function(e, t, n) {
        var r;
        r = function(e, t) {
            var r = n(15),
            i = n(18);
            t.init = function(e) {
                e || (e = 0);
                var t = $("#login-wechat");
                t.length > 0 && t.on("click",
                function() {
                    r.post("/api/login/create_platform_state", {
                        type: e
                    }).then(function(e) {
                        if (i.isWeixin()) {
                            var t = e.data.state,
                            n = "wxee1acd934f6fedf6",
                            r = encodeURIComponent("http://mubu.io/wxlogin"),
                            o = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + n + "&redirect_uri=" + r + "&response_type=code&scope=snsapi_userinfo&state=" + t + "#wechat_redirect";
                            location.href = o
                        } else {
                            var t = e.data.state,
                            n = "wx1dd686ead0ffc496",
                            r = encodeURIComponent("http://mubu.io/wxlogin"),
                            o = "https://open.weixin.qq.com/connect/qrconnect?appid=" + n + "&redirect_uri=" + r + "&response_type=code&scope=snsapi_login&state=" + t + "#wechat_redirect";
                            location.href = o
                        }
                    })
                });
                var n = $("#login-qq");
                n.length > 0 && n.on("click",
                function() {
                    r.post("/api/login/create_platform_state", {
                        type: e
                    }).then(function(e) {
                        var t = e.data.state,
                        n = "101328916",
                        r = encodeURIComponent("http://mubu.io/qqlogin"),
                        i = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=" + n + "&redirect_uri=" + r + "&scope=get_user_info&state=" + t;
                        location.href = i
                    })
                })
            }
        }.call(t, n, t, e),
        !(void 0 !== r && (e.exports = r))
    }
});