var power = "off",
    swing = "off",
    mode = "Cooling",
    temp = 16,
    fan = "AUTO",
    feelMode = ""
;

var tempDisplay,
    modeDisplay,
    onOffButton,
    fanSpeed,
    tempButton,
    modeControl,
    swingSwitch
;

const sendCode = () => {

};

const render = () => {
    tempDisplay.innerHTML = ` ${temp} <sup>&deg;C</sup> `;
    modeDisplay.innerHTML = mode;

    document.getElementById(fan).checked = true;

    document.getElementById(mode).checked = true;
};

const onOff = () => {

    const onApp = () => {
        power = "on"

        fanSpeed.forEach(radio => radio.disabled = false);
        document.getElementById("indicator").style.display = "block";

        tempButton.forEach(button => button.disabled = false);

        modeControl.forEach(radio => radio.disabled = false);

        swingSwitch.disabled = false;

        render();
        modeChange(mode);
    };
    const offApp = () => {
        power = "off"

        fanSpeed.forEach(radio => radio.disabled = true);
        document.getElementById("indicator").style.display = "none";

        modeControl.forEach(radio => radio.disabled = true);
        modeControl.forEach(radio => radio.checked = false);

        tempButton.forEach(button => button.disabled = true);

        swingSwitch.disabled = true;

        tempDisplay.innerHTML = "OFF";
        modeDisplay.innerHTML = "";

    };

    onOffButton.checked ? onApp() : offApp();
};

const fanSpeedMode = (modeSelected) => {
    fan = modeSelected;
};

const changeTemp = (increment) => {

    mode == "Feel" ? (
        increment == -1 ? feelSetMode(0) : feelSetMode(1)
    ) : (
        temp = Math.max(16, Math.min(31, temp + increment)),
        render()
    );


};

const modeChange = (modeSelected) => {
    mode = modeSelected;

    const feelSelected = () => {
        render()
        tempDisplay.innerHTML = "";
        tempButton.forEach(button => button.disabled = false);
        feelMode !== "" ? feelSetMode(feelMode) : (tempDisplay.innerHTML = "");
        document.getElementById("AUTO").disabled = false;
    };
    const coolSelected = () => {
        feelMode = "";
        render();
        tempButton.forEach(button => button.disabled = false);
        document.getElementById("AUTO").disabled = false;
    };
    const drySelected = () => {
        feelMode = "";
        render();
        tempDisplay.innerHTML = "";
        tempButton.forEach(button => button.disabled = true);
        document.getElementById("AUTO").disabled = false;
    };
    const fanSelected = () => {
        feelMode = "";
        tempButton.forEach(button => button.disabled = true);
        document.getElementById("AUTO").disabled = true;
        fan == "AUTO" ? fanSpeedMode("HIGH") : "";
        render();
        tempDisplay.innerHTML = "";
    };
    const heatSelected = () => {
        tempButton.forEach(button => button.disabled = false);
        document.getElementById("AUTO").disabled = false;
        render();
        feelMode = "";
    };

    mode == "Feel" ? feelSelected() : (
        mode == "Cooling" ? coolSelected() : (
            mode == "Dry" ? drySelected() : (
                mode == "Fan" ? fanSelected() : (
                    mode == "Heat" ? heatSelected() : ""
                )
            )
        )
    );

};

const feelSetMode = (mode) => {
    mode == 0 ? (
        tempDisplay.innerHTML = `\u25BC`,
        feelMode = 0
    ) : (
        tempDisplay.innerHTML = `\u25B2`,
        feelMode = 1
    );
};

const swingOnOff = () => {
    swingSwitch.checked ? swing = "on" : swing = "off";
}

document.addEventListener('DOMContentLoaded', () => {
    tempDisplay = document.querySelector(".temp-data");
    modeDisplay = document.querySelector(".temp-info");
    onOffButton = document.getElementById("switch");
    fanSpeed = document.getElementsByName("tab");
    modeControl = document.getElementsByName("value-radio");
    swingSwitch = document.getElementById("swing");
    tempButton = document.querySelectorAll(".temp-button");

    render();
    onOff();

});