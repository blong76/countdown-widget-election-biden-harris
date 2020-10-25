const endDate = '11/03/2020 00:00:00 AM';
const fontColor = new Color("#918A8A")
const daysTillText = 'Days until the election'
const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Biden_Harris_logo.svg/320px-Biden_Harris_logo.svg.png'
const widgetUrl = "https://joebiden.com/"
const daysFont = Font.ultraLightSystemFont(70)
const dummyFont = Font.lightSystemFont(14)

const widget = await createWidget()
widget.backgroundColor = new Color("#ffffff")
if (!config.runsInWidget) {
  await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget() {
        let daysText, dummyText, row, row2

    const widget = new ListWidget()
    widget.url = widgetUrl

    const logoReq = new Request(logoUrl)
    const logoImg = await logoReq.loadImage()

    const wimg = widget.addImage(logoImg)
    wimg.imageSize = new Size(175,44)
    wimg.centerAlignImage()

    widget.addSpacer(10)

    row = widget.addStack()
    row.layoutHorizontally()
    row.centerAlignContent()
    row.size = new Size(190, 60)

    row.addSpacer()

    daysText = row.addText(calculateDays(endDate) + '')
    daysText.textColor = fontColor
    daysText.font = daysFont

    row.addSpacer()

    row2 = widget.addStack()
    row2.layoutHorizontally()
    row2.centerAlignContent()
    row2.size = new Size(190, 18)

    row2.addSpacer()

    dummyText = row2.addText(daysTillText)
    dummyText.textColor = fontColor
    dummyText.font = dummyFont

    row2.addSpacer()

    return widget
}

function calculateDays(targetDate) {
        let days, startDate, timeRemaining;

        targetDate = new Date(targetDate);
        startDate = new Date();

        timeRemaining = parseInt((targetDate.getTime() - startDate.getTime()) / 1000);

        if (timeRemaining >= 0) {
                days = parseInt(timeRemaining / 86400);
                timeRemaining = (timeRemaining % 86400);

                return parseInt(days, 10);
        } else {
                return '???';
        }
}
