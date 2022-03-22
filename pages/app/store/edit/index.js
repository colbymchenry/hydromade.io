import {useAuth} from "../../../../contexts/AuthContext";
import React, {useRef, useState} from "react";
import {AuthLayout} from "../../../../components/layouts/AuthLayout";
import FontAwesomeIcon from "../../../../components/FontAwesomeIcon";
import {faRotate} from "@fortawesome/free-solid-svg-icons";

export default function EditStore(props) {

    const { currentUser, accountInfo } = useAuth();
    const [loaded, setLoaded] = useState(false);
    const [zoom, setZoom] = useState(75)
    const [inspectDevice, setInspectDevice] = useState(null);
    const [portrait, setPortrait] = useState(true);

    const url = (accountInfo && currentUser) ? `https://${accountInfo.store.storeDomain.split(".")[0]}.hydromade.app` : null;

    const devices = {
        "iphone_12_pro": {
            width: 390,
            height: 844
        },
        "iphone_xr": {
            width: 414,
            height: 896
        },
        "iphone_se": {
            width: 375,
            height: 667
        },
        "ipad_air": {
            width: 820,
            height: 1180
        },
        "ipad_mini": {
            width: 768,
            height: 1024
        }
    }

    let dimensions = {
        width: `calc(100% / ${zoom / 100})`,
        height: `calc(100% / ${zoom / 100})`
    }

    if (inspectDevice) {
        if (portrait) {
            dimensions = {
                width: `calc(${devices[inspectDevice].width}px / ${zoom / 100})`,
                height: `calc(${devices[inspectDevice].height}px / ${zoom / 100})`
            }
        } else {
            dimensions = {
                width: `calc(${devices[inspectDevice].height}px / ${zoom / 100})`,
                height: `calc(${devices[inspectDevice].width}px / ${zoom / 100})`
            }
        }
    }

    let iFrameStyles = {
        "zoom": `${zoom / 100}`,
        "-ms-zoom": `${zoom / 100}`,
        "-moz-transform": `scale(${zoom / 100})`,
        "-moz-transform-origin": "0 0",
        "-o-transform": `scale(${zoom / 100})`,
        "-o-transform-origin": "0 0",
        "-webkit-transform": `scale(${zoom / 100})`,
        "-webkit-transform-origin": "0 0",
        "width": dimensions.width,
        "height": dimensions.height,
    }

    return (
        <AuthLayout fullscreen={true}>
            <div className={`d-flex w-100 h-100`}>
                {/* Controls Left */}
                <div className={`d-flex flex-column h-100`} style={{ width: '20%' }}>

                </div>
                {/* iFrame */}
                <div className={`d-flex h-100 flex-column`} style={{ width: '60%'}}>
                    <div className={`d-flex justify-content-between align-items-start`}>
                        <div className={`d-flex flex-column`}>
                            <div className={`d-flex align-items-center`} style={{ gap: '1rem'}}>
                                <h5>Zoom:</h5>
                                <input type={"number"} onChange={(e) => setZoom(parseInt(e.target.value))} min={25} max={100} step={1} value={zoom} className={'form-control'} />
                            </div>
                            <small>*If the window is cut off adjust the zoom.</small>
                        </div>


                        <div className={`d-flex flex-column`}>
                            <div className={`d-flex align-items-center`} style={{ gap: '1rem '}}>
                                <FontAwesomeIcon icon={faRotate} style={{ cursor: 'pointer'}} onClick={() => {
                                    setPortrait(!portrait)
                                    if (!portrait) {
                                        setZoom(100)
                                    }
                                }} />
                                <h5>Inspect:</h5>
                                <select className={"form-select"} onChange={(e) => {
                                    setInspectDevice(e.target.value);
                                    setZoom(100)
                                }} style={{ minWidth: "200px" }}>
                                    <option>Select Device</option>
                                    <option value={"iphone_12_pro"}>iPhone 12 Pro</option>
                                    <option value={"iphone_xr"}>iPhone XR</option>
                                    <option value={"iphone_se"}>iPhone SE</option>
                                    <option value={"ipad_air"}>iPad Air</option>
                                    <option value={"ipad_mini"}>iPad Mini</option>
                                </select>
                            </div>

                            <small>Inspecting <b>{portrait ? "Portrait Mode": "Landscape Mode"}</b></small>
                        </div>
                    </div>
                    <div className={`w-100 h-100 mt-4 text-center`} style={{ overflowX: 'hidden'}}>
                        <iframe src={url} style={!loaded ? { visibility: "hidden" } : iFrameStyles} onLoad={() => setLoaded(true)} />
                    </div>
                </div>

                {/* Controls Right */}
                <div className={`d-flex flex-column h-100`} style={{ width: '20%' }}>

                </div>
            </div>
        </AuthLayout>
    )
}