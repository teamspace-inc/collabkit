declare module 'phosphor-vue' {
  import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentOptionsMixin,
    DefineComponent,
    Plugin,
    PropType,
    ToRefs,
    VNodeProps,
  } from 'vue';
  type PhosphorVuePlugin = Plugin & { installed?: boolean };
  const PhosphorVue: PhosphorVuePlugin;
  export default PhosphorVue;
  type Weight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  type Size = string | number;
  interface IconProps {
    weight: Weight;
    size: Size;
    color: string;
    mirrored: boolean;
  }
  type SetupIconProps = Readonly<
    Required<Pick<IconProps, 'mirrored'>> & Partial<Omit<IconProps, 'mirrored'>>
  >;
  type PropValidator = {
    color: StringConstructor;
    size: PropType<Size>;
    weight: PropType<Weight>;
    mirrored: BooleanConstructor;
  };
  export type PhosphorIcon = DefineComponent<
    PropValidator,
    ToRefs<IconProps>,
    unknown,
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    Record<string, any>,
    string,
    VNodeProps & AllowedComponentProps & ComponentCustomProps,
    SetupIconProps,
    Required<Pick<IconProps, 'mirrored'>>
  >;
  export const PhActivity: PhosphorIcon;
  export const PhAddressBook: PhosphorIcon;
  export const PhAirplane: PhosphorIcon;
  export const PhAirplaneInFlight: PhosphorIcon;
  export const PhAirplaneLanding: PhosphorIcon;
  export const PhAirplaneTakeoff: PhosphorIcon;
  export const PhAirplaneTilt: PhosphorIcon;
  export const PhAirplay: PhosphorIcon;
  export const PhAlarm: PhosphorIcon;
  export const PhAlien: PhosphorIcon;
  export const PhAlignBottom: PhosphorIcon;
  export const PhAlignBottomSimple: PhosphorIcon;
  export const PhAlignCenterHorizontal: PhosphorIcon;
  export const PhAlignCenterHorizontalSimple: PhosphorIcon;
  export const PhAlignCenterVertical: PhosphorIcon;
  export const PhAlignCenterVerticalSimple: PhosphorIcon;
  export const PhAlignLeft: PhosphorIcon;
  export const PhAlignLeftSimple: PhosphorIcon;
  export const PhAlignRight: PhosphorIcon;
  export const PhAlignRightSimple: PhosphorIcon;
  export const PhAlignTop: PhosphorIcon;
  export const PhAlignTopSimple: PhosphorIcon;
  export const PhAnchor: PhosphorIcon;
  export const PhAnchorSimple: PhosphorIcon;
  export const PhAndroidLogo: PhosphorIcon;
  export const PhAngularLogo: PhosphorIcon;
  export const PhAperture: PhosphorIcon;
  export const PhAppStoreLogo: PhosphorIcon;
  export const PhAppWindow: PhosphorIcon;
  export const PhAppleLogo: PhosphorIcon;
  export const PhApplePodcastsLogo: PhosphorIcon;
  export const PhArchive: PhosphorIcon;
  export const PhArchiveBox: PhosphorIcon;
  export const PhArchiveTray: PhosphorIcon;
  export const PhArmchair: PhosphorIcon;
  export const PhArrowArcLeft: PhosphorIcon;
  export const PhArrowArcRight: PhosphorIcon;
  export const PhArrowBendDoubleUpLeft: PhosphorIcon;
  export const PhArrowBendDoubleUpRight: PhosphorIcon;
  export const PhArrowBendDownLeft: PhosphorIcon;
  export const PhArrowBendDownRight: PhosphorIcon;
  export const PhArrowBendLeftDown: PhosphorIcon;
  export const PhArrowBendLeftUp: PhosphorIcon;
  export const PhArrowBendRightDown: PhosphorIcon;
  export const PhArrowBendRightUp: PhosphorIcon;
  export const PhArrowBendUpLeft: PhosphorIcon;
  export const PhArrowBendUpRight: PhosphorIcon;
  export const PhArrowCircleDown: PhosphorIcon;
  export const PhArrowCircleDownLeft: PhosphorIcon;
  export const PhArrowCircleDownRight: PhosphorIcon;
  export const PhArrowCircleLeft: PhosphorIcon;
  export const PhArrowCircleRight: PhosphorIcon;
  export const PhArrowCircleUp: PhosphorIcon;
  export const PhArrowCircleUpLeft: PhosphorIcon;
  export const PhArrowCircleUpRight: PhosphorIcon;
  export const PhArrowClockwise: PhosphorIcon;
  export const PhArrowCounterClockwise: PhosphorIcon;
  export const PhArrowDown: PhosphorIcon;
  export const PhArrowDownLeft: PhosphorIcon;
  export const PhArrowDownRight: PhosphorIcon;
  export const PhArrowElbowDownLeft: PhosphorIcon;
  export const PhArrowElbowDownRight: PhosphorIcon;
  export const PhArrowElbowLeft: PhosphorIcon;
  export const PhArrowElbowLeftDown: PhosphorIcon;
  export const PhArrowElbowLeftUp: PhosphorIcon;
  export const PhArrowElbowRight: PhosphorIcon;
  export const PhArrowElbowRightDown: PhosphorIcon;
  export const PhArrowElbowRightUp: PhosphorIcon;
  export const PhArrowElbowUpLeft: PhosphorIcon;
  export const PhArrowElbowUpRight: PhosphorIcon;
  export const PhArrowFatDown: PhosphorIcon;
  export const PhArrowFatLeft: PhosphorIcon;
  export const PhArrowFatLineDown: PhosphorIcon;
  export const PhArrowFatLineLeft: PhosphorIcon;
  export const PhArrowFatLineRight: PhosphorIcon;
  export const PhArrowFatLineUp: PhosphorIcon;
  export const PhArrowFatLinesDown: PhosphorIcon;
  export const PhArrowFatLinesLeft: PhosphorIcon;
  export const PhArrowFatLinesRight: PhosphorIcon;
  export const PhArrowFatLinesUp: PhosphorIcon;
  export const PhArrowFatRight: PhosphorIcon;
  export const PhArrowFatUp: PhosphorIcon;
  export const PhArrowLeft: PhosphorIcon;
  export const PhArrowLineDown: PhosphorIcon;
  export const PhArrowLineDownLeft: PhosphorIcon;
  export const PhArrowLineDownRight: PhosphorIcon;
  export const PhArrowLineLeft: PhosphorIcon;
  export const PhArrowLineRight: PhosphorIcon;
  export const PhArrowLineUp: PhosphorIcon;
  export const PhArrowLineUpLeft: PhosphorIcon;
  export const PhArrowLineUpRight: PhosphorIcon;
  export const PhArrowRight: PhosphorIcon;
  export const PhArrowSquareDown: PhosphorIcon;
  export const PhArrowSquareDownLeft: PhosphorIcon;
  export const PhArrowSquareDownRight: PhosphorIcon;
  export const PhArrowSquareIn: PhosphorIcon;
  export const PhArrowSquareLeft: PhosphorIcon;
  export const PhArrowSquareOut: PhosphorIcon;
  export const PhArrowSquareRight: PhosphorIcon;
  export const PhArrowSquareUp: PhosphorIcon;
  export const PhArrowSquareUpLeft: PhosphorIcon;
  export const PhArrowSquareUpRight: PhosphorIcon;
  export const PhArrowUDownLeft: PhosphorIcon;
  export const PhArrowUDownRight: PhosphorIcon;
  export const PhArrowULeftDown: PhosphorIcon;
  export const PhArrowULeftUp: PhosphorIcon;
  export const PhArrowURightDown: PhosphorIcon;
  export const PhArrowURightUp: PhosphorIcon;
  export const PhArrowUUpLeft: PhosphorIcon;
  export const PhArrowUUpRight: PhosphorIcon;
  export const PhArrowUp: PhosphorIcon;
  export const PhArrowUpLeft: PhosphorIcon;
  export const PhArrowUpRight: PhosphorIcon;
  export const PhArrowsClockwise: PhosphorIcon;
  export const PhArrowsCounterClockwise: PhosphorIcon;
  export const PhArrowsDownUp: PhosphorIcon;
  export const PhArrowsHorizontal: PhosphorIcon;
  export const PhArrowsIn: PhosphorIcon;
  export const PhArrowsInCardinal: PhosphorIcon;
  export const PhArrowsInLineHorizontal: PhosphorIcon;
  export const PhArrowsInLineVertical: PhosphorIcon;
  export const PhArrowsInSimple: PhosphorIcon;
  export const PhArrowsLeftRight: PhosphorIcon;
  export const PhArrowsOut: PhosphorIcon;
  export const PhArrowsOutCardinal: PhosphorIcon;
  export const PhArrowsOutLineHorizontal: PhosphorIcon;
  export const PhArrowsOutLineVertical: PhosphorIcon;
  export const PhArrowsOutSimple: PhosphorIcon;
  export const PhArrowsVertical: PhosphorIcon;
  export const PhArticle: PhosphorIcon;
  export const PhArticleMedium: PhosphorIcon;
  export const PhArticleNyTimes: PhosphorIcon;
  export const PhAsterisk: PhosphorIcon;
  export const PhAsteriskSimple: PhosphorIcon;
  export const PhAt: PhosphorIcon;
  export const PhAtom: PhosphorIcon;
  export const PhBaby: PhosphorIcon;
  export const PhBackpack: PhosphorIcon;
  export const PhBackspace: PhosphorIcon;
  export const PhBag: PhosphorIcon;
  export const PhBagSimple: PhosphorIcon;
  export const PhBalloon: PhosphorIcon;
  export const PhBandaids: PhosphorIcon;
  export const PhBank: PhosphorIcon;
  export const PhBarbell: PhosphorIcon;
  export const PhBarcode: PhosphorIcon;
  export const PhBarricade: PhosphorIcon;
  export const PhBaseball: PhosphorIcon;
  export const PhBasketball: PhosphorIcon;
  export const PhBathtub: PhosphorIcon;
  export const PhBatteryCharging: PhosphorIcon;
  export const PhBatteryChargingVertical: PhosphorIcon;
  export const PhBatteryEmpty: PhosphorIcon;
  export const PhBatteryFull: PhosphorIcon;
  export const PhBatteryHigh: PhosphorIcon;
  export const PhBatteryLow: PhosphorIcon;
  export const PhBatteryMedium: PhosphorIcon;
  export const PhBatteryPlus: PhosphorIcon;
  export const PhBatteryWarning: PhosphorIcon;
  export const PhBatteryWarningVertical: PhosphorIcon;
  export const PhBed: PhosphorIcon;
  export const PhBeerBottle: PhosphorIcon;
  export const PhBehanceLogo: PhosphorIcon;
  export const PhBell: PhosphorIcon;
  export const PhBellRinging: PhosphorIcon;
  export const PhBellSimple: PhosphorIcon;
  export const PhBellSimpleRinging: PhosphorIcon;
  export const PhBellSimpleSlash: PhosphorIcon;
  export const PhBellSimpleZ: PhosphorIcon;
  export const PhBellSlash: PhosphorIcon;
  export const PhBellZ: PhosphorIcon;
  export const PhBezierCurve: PhosphorIcon;
  export const PhBicycle: PhosphorIcon;
  export const PhBinoculars: PhosphorIcon;
  export const PhBird: PhosphorIcon;
  export const PhBluetooth: PhosphorIcon;
  export const PhBluetoothConnected: PhosphorIcon;
  export const PhBluetoothSlash: PhosphorIcon;
  export const PhBluetoothX: PhosphorIcon;
  export const PhBoat: PhosphorIcon;
  export const PhBook: PhosphorIcon;
  export const PhBookBookmark: PhosphorIcon;
  export const PhBookOpen: PhosphorIcon;
  export const PhBookmark: PhosphorIcon;
  export const PhBookmarkSimple: PhosphorIcon;
  export const PhBookmarks: PhosphorIcon;
  export const PhBookmarksSimple: PhosphorIcon;
  export const PhBooks: PhosphorIcon;
  export const PhBoundingBox: PhosphorIcon;
  export const PhBracketsAngle: PhosphorIcon;
  export const PhBracketsCurly: PhosphorIcon;
  export const PhBracketsRound: PhosphorIcon;
  export const PhBracketsSquare: PhosphorIcon;
  export const PhBrain: PhosphorIcon;
  export const PhBrandy: PhosphorIcon;
  export const PhBriefcase: PhosphorIcon;
  export const PhBriefcaseMetal: PhosphorIcon;
  export const PhBroadcast: PhosphorIcon;
  export const PhBrowser: PhosphorIcon;
  export const PhBrowsers: PhosphorIcon;
  export const PhBug: PhosphorIcon;
  export const PhBugBeetle: PhosphorIcon;
  export const PhBugDroid: PhosphorIcon;
  export const PhBuildings: PhosphorIcon;
  export const PhBus: PhosphorIcon;
  export const PhButterfly: PhosphorIcon;
  export const PhCactus: PhosphorIcon;
  export const PhCake: PhosphorIcon;
  export const PhCalculator: PhosphorIcon;
  export const PhCalendar: PhosphorIcon;
  export const PhCalendarBlank: PhosphorIcon;
  export const PhCalendarCheck: PhosphorIcon;
  export const PhCalendarPlus: PhosphorIcon;
  export const PhCalendarX: PhosphorIcon;
  export const PhCamera: PhosphorIcon;
  export const PhCameraRotate: PhosphorIcon;
  export const PhCameraSlash: PhosphorIcon;
  export const PhCampfire: PhosphorIcon;
  export const PhCar: PhosphorIcon;
  export const PhCarSimple: PhosphorIcon;
  export const PhCardholder: PhosphorIcon;
  export const PhCards: PhosphorIcon;
  export const PhCaretCircleDoubleDown: PhosphorIcon;
  export const PhCaretCircleDoubleLeft: PhosphorIcon;
  export const PhCaretCircleDoubleRight: PhosphorIcon;
  export const PhCaretCircleDoubleUp: PhosphorIcon;
  export const PhCaretCircleDown: PhosphorIcon;
  export const PhCaretCircleLeft: PhosphorIcon;
  export const PhCaretCircleRight: PhosphorIcon;
  export const PhCaretCircleUp: PhosphorIcon;
  export const PhCaretDoubleDown: PhosphorIcon;
  export const PhCaretDoubleLeft: PhosphorIcon;
  export const PhCaretDoubleRight: PhosphorIcon;
  export const PhCaretDoubleUp: PhosphorIcon;
  export const PhCaretDown: PhosphorIcon;
  export const PhCaretLeft: PhosphorIcon;
  export const PhCaretRight: PhosphorIcon;
  export const PhCaretUp: PhosphorIcon;
  export const PhCat: PhosphorIcon;
  export const PhCellSignalFull: PhosphorIcon;
  export const PhCellSignalHigh: PhosphorIcon;
  export const PhCellSignalLow: PhosphorIcon;
  export const PhCellSignalMedium: PhosphorIcon;
  export const PhCellSignalNone: PhosphorIcon;
  export const PhCellSignalSlash: PhosphorIcon;
  export const PhCellSignalX: PhosphorIcon;
  export const PhChalkboard: PhosphorIcon;
  export const PhChalkboardSimple: PhosphorIcon;
  export const PhChalkboardTeacher: PhosphorIcon;
  export const PhChartBar: PhosphorIcon;
  export const PhChartBarHorizontal: PhosphorIcon;
  export const PhChartLine: PhosphorIcon;
  export const PhChartLineUp: PhosphorIcon;
  export const PhChartPie: PhosphorIcon;
  export const PhChartPieSlice: PhosphorIcon;
  export const PhChat: PhosphorIcon;
  export const PhChatCentered: PhosphorIcon;
  export const PhChatCenteredDots: PhosphorIcon;
  export const PhChatCenteredText: PhosphorIcon;
  export const PhChatCircle: PhosphorIcon;
  export const PhChatCircleDots: PhosphorIcon;
  export const PhChatCircleText: PhosphorIcon;
  export const PhChatDots: PhosphorIcon;
  export const PhChatTeardrop: PhosphorIcon;
  export const PhChatTeardropDots: PhosphorIcon;
  export const PhChatTeardropText: PhosphorIcon;
  export const PhChatText: PhosphorIcon;
  export const PhChats: PhosphorIcon;
  export const PhChatsCircle: PhosphorIcon;
  export const PhChatsTeardrop: PhosphorIcon;
  export const PhCheck: PhosphorIcon;
  export const PhCheckCircle: PhosphorIcon;
  export const PhCheckSquare: PhosphorIcon;
  export const PhCheckSquareOffset: PhosphorIcon;
  export const PhChecks: PhosphorIcon;
  export const PhCircle: PhosphorIcon;
  export const PhCircleDashed: PhosphorIcon;
  export const PhCircleHalf: PhosphorIcon;
  export const PhCircleHalfTilt: PhosphorIcon;
  export const PhCircleNotch: PhosphorIcon;
  export const PhCircleWavy: PhosphorIcon;
  export const PhCircleWavyCheck: PhosphorIcon;
  export const PhCircleWavyQuestion: PhosphorIcon;
  export const PhCircleWavyWarning: PhosphorIcon;
  export const PhCirclesFour: PhosphorIcon;
  export const PhCirclesThree: PhosphorIcon;
  export const PhCirclesThreePlus: PhosphorIcon;
  export const PhClipboard: PhosphorIcon;
  export const PhClipboardText: PhosphorIcon;
  export const PhClock: PhosphorIcon;
  export const PhClockAfternoon: PhosphorIcon;
  export const PhClockClockwise: PhosphorIcon;
  export const PhClockCounterClockwise: PhosphorIcon;
  export const PhClosedCaptioning: PhosphorIcon;
  export const PhCloud: PhosphorIcon;
  export const PhCloudArrowDown: PhosphorIcon;
  export const PhCloudArrowUp: PhosphorIcon;
  export const PhCloudCheck: PhosphorIcon;
  export const PhCloudFog: PhosphorIcon;
  export const PhCloudLightning: PhosphorIcon;
  export const PhCloudMoon: PhosphorIcon;
  export const PhCloudRain: PhosphorIcon;
  export const PhCloudSlash: PhosphorIcon;
  export const PhCloudSnow: PhosphorIcon;
  export const PhCloudSun: PhosphorIcon;
  export const PhClub: PhosphorIcon;
  export const PhCoatHanger: PhosphorIcon;
  export const PhCode: PhosphorIcon;
  export const PhCodeSimple: PhosphorIcon;
  export const PhCodepenLogo: PhosphorIcon;
  export const PhCodesandboxLogo: PhosphorIcon;
  export const PhCoffee: PhosphorIcon;
  export const PhCoin: PhosphorIcon;
  export const PhCoinVertical: PhosphorIcon;
  export const PhCoins: PhosphorIcon;
  export const PhColumns: PhosphorIcon;
  export const PhCommand: PhosphorIcon;
  export const PhCompass: PhosphorIcon;
  export const PhComputerTower: PhosphorIcon;
  export const PhConfetti: PhosphorIcon;
  export const PhCookie: PhosphorIcon;
  export const PhCookingPot: PhosphorIcon;
  export const PhCopy: PhosphorIcon;
  export const PhCopySimple: PhosphorIcon;
  export const PhCopyleft: PhosphorIcon;
  export const PhCopyright: PhosphorIcon;
  export const PhCornersIn: PhosphorIcon;
  export const PhCornersOut: PhosphorIcon;
  export const PhCpu: PhosphorIcon;
  export const PhCreditCard: PhosphorIcon;
  export const PhCrop: PhosphorIcon;
  export const PhCrosshair: PhosphorIcon;
  export const PhCrosshairSimple: PhosphorIcon;
  export const PhCrown: PhosphorIcon;
  export const PhCrownSimple: PhosphorIcon;
  export const PhCube: PhosphorIcon;
  export const PhCurrencyBtc: PhosphorIcon;
  export const PhCurrencyCircleDollar: PhosphorIcon;
  export const PhCurrencyCny: PhosphorIcon;
  export const PhCurrencyDollar: PhosphorIcon;
  export const PhCurrencyDollarSimple: PhosphorIcon;
  export const PhCurrencyEth: PhosphorIcon;
  export const PhCurrencyEur: PhosphorIcon;
  export const PhCurrencyGbp: PhosphorIcon;
  export const PhCurrencyInr: PhosphorIcon;
  export const PhCurrencyJpy: PhosphorIcon;
  export const PhCurrencyKrw: PhosphorIcon;
  export const PhCurrencyKzt: PhosphorIcon;
  export const PhCurrencyNgn: PhosphorIcon;
  export const PhCurrencyRub: PhosphorIcon;
  export const PhCursor: PhosphorIcon;
  export const PhCursorText: PhosphorIcon;
  export const PhCylinder: PhosphorIcon;
  export const PhDatabase: PhosphorIcon;
  export const PhDesktop: PhosphorIcon;
  export const PhDesktopTower: PhosphorIcon;
  export const PhDetective: PhosphorIcon;
  export const PhDeviceMobile: PhosphorIcon;
  export const PhDeviceMobileCamera: PhosphorIcon;
  export const PhDeviceMobileSpeaker: PhosphorIcon;
  export const PhDeviceTablet: PhosphorIcon;
  export const PhDeviceTabletCamera: PhosphorIcon;
  export const PhDeviceTabletSpeaker: PhosphorIcon;
  export const PhDiamond: PhosphorIcon;
  export const PhDiamondsFour: PhosphorIcon;
  export const PhDiceFive: PhosphorIcon;
  export const PhDiceFour: PhosphorIcon;
  export const PhDiceOne: PhosphorIcon;
  export const PhDiceSix: PhosphorIcon;
  export const PhDiceThree: PhosphorIcon;
  export const PhDiceTwo: PhosphorIcon;
  export const PhDisc: PhosphorIcon;
  export const PhDiscordLogo: PhosphorIcon;
  export const PhDivide: PhosphorIcon;
  export const PhDog: PhosphorIcon;
  export const PhDoor: PhosphorIcon;
  export const PhDotsNine: PhosphorIcon;
  export const PhDotsSix: PhosphorIcon;
  export const PhDotsSixVertical: PhosphorIcon;
  export const PhDotsThree: PhosphorIcon;
  export const PhDotsThreeCircle: PhosphorIcon;
  export const PhDotsThreeCircleVertical: PhosphorIcon;
  export const PhDotsThreeOutline: PhosphorIcon;
  export const PhDotsThreeOutlineVertical: PhosphorIcon;
  export const PhDotsThreeVertical: PhosphorIcon;
  export const PhDownload: PhosphorIcon;
  export const PhDownloadSimple: PhosphorIcon;
  export const PhDribbbleLogo: PhosphorIcon;
  export const PhDrop: PhosphorIcon;
  export const PhDropHalf: PhosphorIcon;
  export const PhDropHalfBottom: PhosphorIcon;
  export const PhEar: PhosphorIcon;
  export const PhEarSlash: PhosphorIcon;
  export const PhEgg: PhosphorIcon;
  export const PhEggCrack: PhosphorIcon;
  export const PhEject: PhosphorIcon;
  export const PhEjectSimple: PhosphorIcon;
  export const PhEnvelope: PhosphorIcon;
  export const PhEnvelopeOpen: PhosphorIcon;
  export const PhEnvelopeSimple: PhosphorIcon;
  export const PhEnvelopeSimpleOpen: PhosphorIcon;
  export const PhEqualizer: PhosphorIcon;
  export const PhEquals: PhosphorIcon;
  export const PhEraser: PhosphorIcon;
  export const PhExam: PhosphorIcon;
  export const PhExport: PhosphorIcon;
  export const PhEye: PhosphorIcon;
  export const PhEyeClosed: PhosphorIcon;
  export const PhEyeSlash: PhosphorIcon;
  export const PhEyedropper: PhosphorIcon;
  export const PhEyedropperSample: PhosphorIcon;
  export const PhEyeglasses: PhosphorIcon;
  export const PhFaceMask: PhosphorIcon;
  export const PhFacebookLogo: PhosphorIcon;
  export const PhFactory: PhosphorIcon;
  export const PhFaders: PhosphorIcon;
  export const PhFadersHorizontal: PhosphorIcon;
  export const PhFastForward: PhosphorIcon;
  export const PhFastForwardCircle: PhosphorIcon;
  export const PhFigmaLogo: PhosphorIcon;
  export const PhFile: PhosphorIcon;
  export const PhFileArrowDown: PhosphorIcon;
  export const PhFileArrowUp: PhosphorIcon;
  export const PhFileAudio: PhosphorIcon;
  export const PhFileCloud: PhosphorIcon;
  export const PhFileCode: PhosphorIcon;
  export const PhFileCss: PhosphorIcon;
  export const PhFileCsv: PhosphorIcon;
  export const PhFileDoc: PhosphorIcon;
  export const PhFileDotted: PhosphorIcon;
  export const PhFileHtml: PhosphorIcon;
  export const PhFileImage: PhosphorIcon;
  export const PhFileJpg: PhosphorIcon;
  export const PhFileJs: PhosphorIcon;
  export const PhFileJsx: PhosphorIcon;
  export const PhFileLock: PhosphorIcon;
  export const PhFileMinus: PhosphorIcon;
  export const PhFilePdf: PhosphorIcon;
  export const PhFilePlus: PhosphorIcon;
  export const PhFilePng: PhosphorIcon;
  export const PhFilePpt: PhosphorIcon;
  export const PhFileRs: PhosphorIcon;
  export const PhFileSearch: PhosphorIcon;
  export const PhFileText: PhosphorIcon;
  export const PhFileTs: PhosphorIcon;
  export const PhFileTsx: PhosphorIcon;
  export const PhFileVideo: PhosphorIcon;
  export const PhFileVue: PhosphorIcon;
  export const PhFileX: PhosphorIcon;
  export const PhFileXls: PhosphorIcon;
  export const PhFileZip: PhosphorIcon;
  export const PhFiles: PhosphorIcon;
  export const PhFilmScript: PhosphorIcon;
  export const PhFilmSlate: PhosphorIcon;
  export const PhFilmStrip: PhosphorIcon;
  export const PhFingerprint: PhosphorIcon;
  export const PhFingerprintSimple: PhosphorIcon;
  export const PhFinnTheHuman: PhosphorIcon;
  export const PhFire: PhosphorIcon;
  export const PhFireSimple: PhosphorIcon;
  export const PhFirstAid: PhosphorIcon;
  export const PhFirstAidKit: PhosphorIcon;
  export const PhFish: PhosphorIcon;
  export const PhFishSimple: PhosphorIcon;
  export const PhFlag: PhosphorIcon;
  export const PhFlagBanner: PhosphorIcon;
  export const PhFlagCheckered: PhosphorIcon;
  export const PhFlame: PhosphorIcon;
  export const PhFlashlight: PhosphorIcon;
  export const PhFlask: PhosphorIcon;
  export const PhFloppyDisk: PhosphorIcon;
  export const PhFloppyDiskBack: PhosphorIcon;
  export const PhFlowArrow: PhosphorIcon;
  export const PhFlower: PhosphorIcon;
  export const PhFlowerLotus: PhosphorIcon;
  export const PhFlyingSaucer: PhosphorIcon;
  export const PhFolder: PhosphorIcon;
  export const PhFolderDotted: PhosphorIcon;
  export const PhFolderLock: PhosphorIcon;
  export const PhFolderMinus: PhosphorIcon;
  export const PhFolderNotch: PhosphorIcon;
  export const PhFolderNotchMinus: PhosphorIcon;
  export const PhFolderNotchOpen: PhosphorIcon;
  export const PhFolderNotchPlus: PhosphorIcon;
  export const PhFolderOpen: PhosphorIcon;
  export const PhFolderPlus: PhosphorIcon;
  export const PhFolderSimple: PhosphorIcon;
  export const PhFolderSimpleDotted: PhosphorIcon;
  export const PhFolderSimpleLock: PhosphorIcon;
  export const PhFolderSimpleMinus: PhosphorIcon;
  export const PhFolderSimplePlus: PhosphorIcon;
  export const PhFolderSimpleStar: PhosphorIcon;
  export const PhFolderSimpleUser: PhosphorIcon;
  export const PhFolderStar: PhosphorIcon;
  export const PhFolderUser: PhosphorIcon;
  export const PhFolders: PhosphorIcon;
  export const PhFootball: PhosphorIcon;
  export const PhForkKnife: PhosphorIcon;
  export const PhFrameCorners: PhosphorIcon;
  export const PhFramerLogo: PhosphorIcon;
  export const PhFunction: PhosphorIcon;
  export const PhFunnel: PhosphorIcon;
  export const PhFunnelSimple: PhosphorIcon;
  export const PhGameController: PhosphorIcon;
  export const PhGasPump: PhosphorIcon;
  export const PhGauge: PhosphorIcon;
  export const PhGear: PhosphorIcon;
  export const PhGearSix: PhosphorIcon;
  export const PhGenderFemale: PhosphorIcon;
  export const PhGenderIntersex: PhosphorIcon;
  export const PhGenderMale: PhosphorIcon;
  export const PhGenderNeuter: PhosphorIcon;
  export const PhGenderNonbinary: PhosphorIcon;
  export const PhGenderTransgender: PhosphorIcon;
  export const PhGhost: PhosphorIcon;
  export const PhGif: PhosphorIcon;
  export const PhGift: PhosphorIcon;
  export const PhGitBranch: PhosphorIcon;
  export const PhGitCommit: PhosphorIcon;
  export const PhGitDiff: PhosphorIcon;
  export const PhGitFork: PhosphorIcon;
  export const PhGitMerge: PhosphorIcon;
  export const PhGitPullRequest: PhosphorIcon;
  export const PhGithubLogo: PhosphorIcon;
  export const PhGitlabLogo: PhosphorIcon;
  export const PhGitlabLogoSimple: PhosphorIcon;
  export const PhGlobe: PhosphorIcon;
  export const PhGlobeHemisphereEast: PhosphorIcon;
  export const PhGlobeHemisphereWest: PhosphorIcon;
  export const PhGlobeSimple: PhosphorIcon;
  export const PhGlobeStand: PhosphorIcon;
  export const PhGoogleChromeLogo: PhosphorIcon;
  export const PhGoogleLogo: PhosphorIcon;
  export const PhGooglePhotosLogo: PhosphorIcon;
  export const PhGooglePlayLogo: PhosphorIcon;
  export const PhGooglePodcastsLogo: PhosphorIcon;
  export const PhGradient: PhosphorIcon;
  export const PhGraduationCap: PhosphorIcon;
  export const PhGraph: PhosphorIcon;
  export const PhGridFour: PhosphorIcon;
  export const PhHamburger: PhosphorIcon;
  export const PhHand: PhosphorIcon;
  export const PhHandEye: PhosphorIcon;
  export const PhHandFist: PhosphorIcon;
  export const PhHandGrabbing: PhosphorIcon;
  export const PhHandPalm: PhosphorIcon;
  export const PhHandPointing: PhosphorIcon;
  export const PhHandSoap: PhosphorIcon;
  export const PhHandWaving: PhosphorIcon;
  export const PhHandbag: PhosphorIcon;
  export const PhHandbagSimple: PhosphorIcon;
  export const PhHandsClapping: PhosphorIcon;
  export const PhHandshake: PhosphorIcon;
  export const PhHardDrive: PhosphorIcon;
  export const PhHardDrives: PhosphorIcon;
  export const PhHash: PhosphorIcon;
  export const PhHashStraight: PhosphorIcon;
  export const PhHeadlights: PhosphorIcon;
  export const PhHeadphones: PhosphorIcon;
  export const PhHeadset: PhosphorIcon;
  export const PhHeart: PhosphorIcon;
  export const PhHeartBreak: PhosphorIcon;
  export const PhHeartStraight: PhosphorIcon;
  export const PhHeartStraightBreak: PhosphorIcon;
  export const PhHeartbeat: PhosphorIcon;
  export const PhHexagon: PhosphorIcon;
  export const PhHighlighterCircle: PhosphorIcon;
  export const PhHorse: PhosphorIcon;
  export const PhHourglass: PhosphorIcon;
  export const PhHourglassHigh: PhosphorIcon;
  export const PhHourglassLow: PhosphorIcon;
  export const PhHourglassMedium: PhosphorIcon;
  export const PhHourglassSimple: PhosphorIcon;
  export const PhHourglassSimpleHigh: PhosphorIcon;
  export const PhHourglassSimpleLow: PhosphorIcon;
  export const PhHourglassSimpleMedium: PhosphorIcon;
  export const PhHouse: PhosphorIcon;
  export const PhHouseLine: PhosphorIcon;
  export const PhHouseSimple: PhosphorIcon;
  export const PhIdentificationBadge: PhosphorIcon;
  export const PhIdentificationCard: PhosphorIcon;
  export const PhImage: PhosphorIcon;
  export const PhImageSquare: PhosphorIcon;
  export const PhInfinity: PhosphorIcon;
  export const PhInfo: PhosphorIcon;
  export const PhInstagramLogo: PhosphorIcon;
  export const PhIntersect: PhosphorIcon;
  export const PhJeep: PhosphorIcon;
  export const PhKanban: PhosphorIcon;
  export const PhKey: PhosphorIcon;
  export const PhKeyReturn: PhosphorIcon;
  export const PhKeyboard: PhosphorIcon;
  export const PhKeyhole: PhosphorIcon;
  export const PhKnife: PhosphorIcon;
  export const PhLadder: PhosphorIcon;
  export const PhLadderSimple: PhosphorIcon;
  export const PhLamp: PhosphorIcon;
  export const PhLaptop: PhosphorIcon;
  export const PhLayout: PhosphorIcon;
  export const PhLeaf: PhosphorIcon;
  export const PhLifebuoy: PhosphorIcon;
  export const PhLightbulb: PhosphorIcon;
  export const PhLightbulbFilament: PhosphorIcon;
  export const PhLightning: PhosphorIcon;
  export const PhLightningSlash: PhosphorIcon;
  export const PhLineSegment: PhosphorIcon;
  export const PhLineSegments: PhosphorIcon;
  export const PhLink: PhosphorIcon;
  export const PhLinkBreak: PhosphorIcon;
  export const PhLinkSimple: PhosphorIcon;
  export const PhLinkSimpleBreak: PhosphorIcon;
  export const PhLinkSimpleHorizontal: PhosphorIcon;
  export const PhLinkSimpleHorizontalBreak: PhosphorIcon;
  export const PhLinkedinLogo: PhosphorIcon;
  export const PhLinuxLogo: PhosphorIcon;
  export const PhList: PhosphorIcon;
  export const PhListBullets: PhosphorIcon;
  export const PhListChecks: PhosphorIcon;
  export const PhListDashes: PhosphorIcon;
  export const PhListNumbers: PhosphorIcon;
  export const PhListPlus: PhosphorIcon;
  export const PhLock: PhosphorIcon;
  export const PhLockKey: PhosphorIcon;
  export const PhLockKeyOpen: PhosphorIcon;
  export const PhLockLaminated: PhosphorIcon;
  export const PhLockLaminatedOpen: PhosphorIcon;
  export const PhLockOpen: PhosphorIcon;
  export const PhLockSimple: PhosphorIcon;
  export const PhLockSimpleOpen: PhosphorIcon;
  export const PhMagicWand: PhosphorIcon;
  export const PhMagnet: PhosphorIcon;
  export const PhMagnetStraight: PhosphorIcon;
  export const PhMagnifyingGlass: PhosphorIcon;
  export const PhMagnifyingGlassMinus: PhosphorIcon;
  export const PhMagnifyingGlassPlus: PhosphorIcon;
  export const PhMapPin: PhosphorIcon;
  export const PhMapPinLine: PhosphorIcon;
  export const PhMapTrifold: PhosphorIcon;
  export const PhMarkerCircle: PhosphorIcon;
  export const PhMartini: PhosphorIcon;
  export const PhMaskHappy: PhosphorIcon;
  export const PhMaskSad: PhosphorIcon;
  export const PhMathOperations: PhosphorIcon;
  export const PhMedal: PhosphorIcon;
  export const PhMediumLogo: PhosphorIcon;
  export const PhMegaphone: PhosphorIcon;
  export const PhMegaphoneSimple: PhosphorIcon;
  export const PhMessengerLogo: PhosphorIcon;
  export const PhMicrophone: PhosphorIcon;
  export const PhMicrophoneSlash: PhosphorIcon;
  export const PhMicrophoneStage: PhosphorIcon;
  export const PhMicrosoftExcelLogo: PhosphorIcon;
  export const PhMicrosoftPowerpointLogo: PhosphorIcon;
  export const PhMicrosoftTeamsLogo: PhosphorIcon;
  export const PhMicrosoftWordLogo: PhosphorIcon;
  export const PhMinus: PhosphorIcon;
  export const PhMinusCircle: PhosphorIcon;
  export const PhMoney: PhosphorIcon;
  export const PhMonitor: PhosphorIcon;
  export const PhMonitorPlay: PhosphorIcon;
  export const PhMoon: PhosphorIcon;
  export const PhMoonStars: PhosphorIcon;
  export const PhMountains: PhosphorIcon;
  export const PhMouse: PhosphorIcon;
  export const PhMouseSimple: PhosphorIcon;
  export const PhMusicNote: PhosphorIcon;
  export const PhMusicNoteSimple: PhosphorIcon;
  export const PhMusicNotes: PhosphorIcon;
  export const PhMusicNotesPlus: PhosphorIcon;
  export const PhMusicNotesSimple: PhosphorIcon;
  export const PhNavigationArrow: PhosphorIcon;
  export const PhNeedle: PhosphorIcon;
  export const PhNewspaper: PhosphorIcon;
  export const PhNewspaperClipping: PhosphorIcon;
  export const PhNote: PhosphorIcon;
  export const PhNoteBlank: PhosphorIcon;
  export const PhNotePencil: PhosphorIcon;
  export const PhNotebook: PhosphorIcon;
  export const PhNotepad: PhosphorIcon;
  export const PhNotification: PhosphorIcon;
  export const PhNumberCircleEight: PhosphorIcon;
  export const PhNumberCircleFive: PhosphorIcon;
  export const PhNumberCircleFour: PhosphorIcon;
  export const PhNumberCircleNine: PhosphorIcon;
  export const PhNumberCircleOne: PhosphorIcon;
  export const PhNumberCircleSeven: PhosphorIcon;
  export const PhNumberCircleSix: PhosphorIcon;
  export const PhNumberCircleThree: PhosphorIcon;
  export const PhNumberCircleTwo: PhosphorIcon;
  export const PhNumberCircleZero: PhosphorIcon;
  export const PhNumberEight: PhosphorIcon;
  export const PhNumberFive: PhosphorIcon;
  export const PhNumberFour: PhosphorIcon;
  export const PhNumberNine: PhosphorIcon;
  export const PhNumberOne: PhosphorIcon;
  export const PhNumberSeven: PhosphorIcon;
  export const PhNumberSix: PhosphorIcon;
  export const PhNumberSquareEight: PhosphorIcon;
  export const PhNumberSquareFive: PhosphorIcon;
  export const PhNumberSquareFour: PhosphorIcon;
  export const PhNumberSquareNine: PhosphorIcon;
  export const PhNumberSquareOne: PhosphorIcon;
  export const PhNumberSquareSeven: PhosphorIcon;
  export const PhNumberSquareSix: PhosphorIcon;
  export const PhNumberSquareThree: PhosphorIcon;
  export const PhNumberSquareTwo: PhosphorIcon;
  export const PhNumberSquareZero: PhosphorIcon;
  export const PhNumberThree: PhosphorIcon;
  export const PhNumberTwo: PhosphorIcon;
  export const PhNumberZero: PhosphorIcon;
  export const PhNut: PhosphorIcon;
  export const PhNyTimesLogo: PhosphorIcon;
  export const PhOctagon: PhosphorIcon;
  export const PhOption: PhosphorIcon;
  export const PhPackage: PhosphorIcon;
  export const PhPaintBrush: PhosphorIcon;
  export const PhPaintBrushBroad: PhosphorIcon;
  export const PhPaintBrushHousehold: PhosphorIcon;
  export const PhPaintBucket: PhosphorIcon;
  export const PhPaintRoller: PhosphorIcon;
  export const PhPalette: PhosphorIcon;
  export const PhPaperPlane: PhosphorIcon;
  export const PhPaperPlaneRight: PhosphorIcon;
  export const PhPaperPlaneTilt: PhosphorIcon;
  export const PhPaperclip: PhosphorIcon;
  export const PhPaperclipHorizontal: PhosphorIcon;
  export const PhParachute: PhosphorIcon;
  export const PhPassword: PhosphorIcon;
  export const PhPath: PhosphorIcon;
  export const PhPause: PhosphorIcon;
  export const PhPauseCircle: PhosphorIcon;
  export const PhPawPrint: PhosphorIcon;
  export const PhPeace: PhosphorIcon;
  export const PhPen: PhosphorIcon;
  export const PhPenNib: PhosphorIcon;
  export const PhPenNibStraight: PhosphorIcon;
  export const PhPencil: PhosphorIcon;
  export const PhPencilCircle: PhosphorIcon;
  export const PhPencilLine: PhosphorIcon;
  export const PhPencilSimple: PhosphorIcon;
  export const PhPencilSimpleLine: PhosphorIcon;
  export const PhPercent: PhosphorIcon;
  export const PhPerson: PhosphorIcon;
  export const PhPersonSimple: PhosphorIcon;
  export const PhPersonSimpleRun: PhosphorIcon;
  export const PhPersonSimpleWalk: PhosphorIcon;
  export const PhPerspective: PhosphorIcon;
  export const PhPhone: PhosphorIcon;
  export const PhPhoneCall: PhosphorIcon;
  export const PhPhoneDisconnect: PhosphorIcon;
  export const PhPhoneIncoming: PhosphorIcon;
  export const PhPhoneOutgoing: PhosphorIcon;
  export const PhPhoneSlash: PhosphorIcon;
  export const PhPhoneX: PhosphorIcon;
  export const PhPhosphorLogo: PhosphorIcon;
  export const PhPianoKeys: PhosphorIcon;
  export const PhPictureInPicture: PhosphorIcon;
  export const PhPill: PhosphorIcon;
  export const PhPinterestLogo: PhosphorIcon;
  export const PhPinwheel: PhosphorIcon;
  export const PhPizza: PhosphorIcon;
  export const PhPlaceholder: PhosphorIcon;
  export const PhPlanet: PhosphorIcon;
  export const PhPlay: PhosphorIcon;
  export const PhPlayCircle: PhosphorIcon;
  export const PhPlaylist: PhosphorIcon;
  export const PhPlug: PhosphorIcon;
  export const PhPlugs: PhosphorIcon;
  export const PhPlugsConnected: PhosphorIcon;
  export const PhPlus: PhosphorIcon;
  export const PhPlusCircle: PhosphorIcon;
  export const PhPlusMinus: PhosphorIcon;
  export const PhPokerChip: PhosphorIcon;
  export const PhPoliceCar: PhosphorIcon;
  export const PhPolygon: PhosphorIcon;
  export const PhPopcorn: PhosphorIcon;
  export const PhPower: PhosphorIcon;
  export const PhPrescription: PhosphorIcon;
  export const PhPresentation: PhosphorIcon;
  export const PhPresentationChart: PhosphorIcon;
  export const PhPrinter: PhosphorIcon;
  export const PhProhibit: PhosphorIcon;
  export const PhProhibitInset: PhosphorIcon;
  export const PhProjectorScreen: PhosphorIcon;
  export const PhProjectorScreenChart: PhosphorIcon;
  export const PhPushPin: PhosphorIcon;
  export const PhPushPinSimple: PhosphorIcon;
  export const PhPushPinSimpleSlash: PhosphorIcon;
  export const PhPushPinSlash: PhosphorIcon;
  export const PhPuzzlePiece: PhosphorIcon;
  export const PhQrCode: PhosphorIcon;
  export const PhQuestion: PhosphorIcon;
  export const PhQueue: PhosphorIcon;
  export const PhQuotes: PhosphorIcon;
  export const PhRadical: PhosphorIcon;
  export const PhRadio: PhosphorIcon;
  export const PhRadioButton: PhosphorIcon;
  export const PhRainbow: PhosphorIcon;
  export const PhRainbowCloud: PhosphorIcon;
  export const PhReceipt: PhosphorIcon;
  export const PhRecord: PhosphorIcon;
  export const PhRectangle: PhosphorIcon;
  export const PhRecycle: PhosphorIcon;
  export const PhRedditLogo: PhosphorIcon;
  export const PhRepeat: PhosphorIcon;
  export const PhRepeatOnce: PhosphorIcon;
  export const PhRewind: PhosphorIcon;
  export const PhRewindCircle: PhosphorIcon;
  export const PhRobot: PhosphorIcon;
  export const PhRocket: PhosphorIcon;
  export const PhRocketLaunch: PhosphorIcon;
  export const PhRows: PhosphorIcon;
  export const PhRss: PhosphorIcon;
  export const PhRssSimple: PhosphorIcon;
  export const PhRug: PhosphorIcon;
  export const PhRuler: PhosphorIcon;
  export const PhScales: PhosphorIcon;
  export const PhScan: PhosphorIcon;
  export const PhScissors: PhosphorIcon;
  export const PhScreencast: PhosphorIcon;
  export const PhScribbleLoop: PhosphorIcon;
  export const PhScroll: PhosphorIcon;
  export const PhSelection: PhosphorIcon;
  export const PhSelectionAll: PhosphorIcon;
  export const PhSelectionBackground: PhosphorIcon;
  export const PhSelectionForeground: PhosphorIcon;
  export const PhSelectionInverse: PhosphorIcon;
  export const PhSelectionPlus: PhosphorIcon;
  export const PhSelectionSlash: PhosphorIcon;
  export const PhShare: PhosphorIcon;
  export const PhShareNetwork: PhosphorIcon;
  export const PhShield: PhosphorIcon;
  export const PhShieldCheck: PhosphorIcon;
  export const PhShieldCheckered: PhosphorIcon;
  export const PhShieldChevron: PhosphorIcon;
  export const PhShieldPlus: PhosphorIcon;
  export const PhShieldSlash: PhosphorIcon;
  export const PhShieldStar: PhosphorIcon;
  export const PhShieldWarning: PhosphorIcon;
  export const PhShoppingBag: PhosphorIcon;
  export const PhShoppingBagOpen: PhosphorIcon;
  export const PhShoppingCart: PhosphorIcon;
  export const PhShoppingCartSimple: PhosphorIcon;
  export const PhShower: PhosphorIcon;
  export const PhShuffle: PhosphorIcon;
  export const PhShuffleAngular: PhosphorIcon;
  export const PhShuffleSimple: PhosphorIcon;
  export const PhSidebar: PhosphorIcon;
  export const PhSidebarSimple: PhosphorIcon;
  export const PhSignIn: PhosphorIcon;
  export const PhSignOut: PhosphorIcon;
  export const PhSignpost: PhosphorIcon;
  export const PhSimCard: PhosphorIcon;
  export const PhSketchLogo: PhosphorIcon;
  export const PhSkipBack: PhosphorIcon;
  export const PhSkipBackCircle: PhosphorIcon;
  export const PhSkipForward: PhosphorIcon;
  export const PhSkipForwardCircle: PhosphorIcon;
  export const PhSkull: PhosphorIcon;
  export const PhSlackLogo: PhosphorIcon;
  export const PhSliders: PhosphorIcon;
  export const PhSlidersHorizontal: PhosphorIcon;
  export const PhSmiley: PhosphorIcon;
  export const PhSmileyBlank: PhosphorIcon;
  export const PhSmileyMeh: PhosphorIcon;
  export const PhSmileyNervous: PhosphorIcon;
  export const PhSmileySad: PhosphorIcon;
  export const PhSmileySticker: PhosphorIcon;
  export const PhSmileyWink: PhosphorIcon;
  export const PhSmileyXEyes: PhosphorIcon;
  export const PhSnapchatLogo: PhosphorIcon;
  export const PhSnowflake: PhosphorIcon;
  export const PhSoccerBall: PhosphorIcon;
  export const PhSortAscending: PhosphorIcon;
  export const PhSortDescending: PhosphorIcon;
  export const PhSpade: PhosphorIcon;
  export const PhSparkle: PhosphorIcon;
  export const PhSpeakerHigh: PhosphorIcon;
  export const PhSpeakerLow: PhosphorIcon;
  export const PhSpeakerNone: PhosphorIcon;
  export const PhSpeakerSimpleHigh: PhosphorIcon;
  export const PhSpeakerSimpleLow: PhosphorIcon;
  export const PhSpeakerSimpleNone: PhosphorIcon;
  export const PhSpeakerSimpleSlash: PhosphorIcon;
  export const PhSpeakerSimpleX: PhosphorIcon;
  export const PhSpeakerSlash: PhosphorIcon;
  export const PhSpeakerX: PhosphorIcon;
  export const PhSpinner: PhosphorIcon;
  export const PhSpinnerGap: PhosphorIcon;
  export const PhSpiral: PhosphorIcon;
  export const PhSpotifyLogo: PhosphorIcon;
  export const PhSquare: PhosphorIcon;
  export const PhSquareHalf: PhosphorIcon;
  export const PhSquareHalfBottom: PhosphorIcon;
  export const PhSquareLogo: PhosphorIcon;
  export const PhSquaresFour: PhosphorIcon;
  export const PhStack: PhosphorIcon;
  export const PhStackOverflowLogo: PhosphorIcon;
  export const PhStackSimple: PhosphorIcon;
  export const PhStamp: PhosphorIcon;
  export const PhStar: PhosphorIcon;
  export const PhStarFour: PhosphorIcon;
  export const PhStarHalf: PhosphorIcon;
  export const PhSticker: PhosphorIcon;
  export const PhStop: PhosphorIcon;
  export const PhStopCircle: PhosphorIcon;
  export const PhStorefront: PhosphorIcon;
  export const PhStrategy: PhosphorIcon;
  export const PhStripeLogo: PhosphorIcon;
  export const PhStudent: PhosphorIcon;
  export const PhSuitcase: PhosphorIcon;
  export const PhSuitcaseSimple: PhosphorIcon;
  export const PhSun: PhosphorIcon;
  export const PhSunDim: PhosphorIcon;
  export const PhSunHorizon: PhosphorIcon;
  export const PhSunglasses: PhosphorIcon;
  export const PhSwap: PhosphorIcon;
  export const PhSwatches: PhosphorIcon;
  export const PhSword: PhosphorIcon;
  export const PhSyringe: PhosphorIcon;
  export const PhTShirt: PhosphorIcon;
  export const PhTable: PhosphorIcon;
  export const PhTabs: PhosphorIcon;
  export const PhTag: PhosphorIcon;
  export const PhTagChevron: PhosphorIcon;
  export const PhTagSimple: PhosphorIcon;
  export const PhTarget: PhosphorIcon;
  export const PhTaxi: PhosphorIcon;
  export const PhTelegramLogo: PhosphorIcon;
  export const PhTelevision: PhosphorIcon;
  export const PhTelevisionSimple: PhosphorIcon;
  export const PhTennisBall: PhosphorIcon;
  export const PhTerminal: PhosphorIcon;
  export const PhTerminalWindow: PhosphorIcon;
  export const PhTestTube: PhosphorIcon;
  export const PhTextAa: PhosphorIcon;
  export const PhTextAlignCenter: PhosphorIcon;
  export const PhTextAlignJustify: PhosphorIcon;
  export const PhTextAlignLeft: PhosphorIcon;
  export const PhTextAlignRight: PhosphorIcon;
  export const PhTextBolder: PhosphorIcon;
  export const PhTextH: PhosphorIcon;
  export const PhTextHFive: PhosphorIcon;
  export const PhTextHFour: PhosphorIcon;
  export const PhTextHOne: PhosphorIcon;
  export const PhTextHSix: PhosphorIcon;
  export const PhTextHThree: PhosphorIcon;
  export const PhTextHTwo: PhosphorIcon;
  export const PhTextIndent: PhosphorIcon;
  export const PhTextItalic: PhosphorIcon;
  export const PhTextOutdent: PhosphorIcon;
  export const PhTextStrikethrough: PhosphorIcon;
  export const PhTextT: PhosphorIcon;
  export const PhTextUnderline: PhosphorIcon;
  export const PhTextbox: PhosphorIcon;
  export const PhThermometer: PhosphorIcon;
  export const PhThermometerCold: PhosphorIcon;
  export const PhThermometerHot: PhosphorIcon;
  export const PhThermometerSimple: PhosphorIcon;
  export const PhThumbsDown: PhosphorIcon;
  export const PhThumbsUp: PhosphorIcon;
  export const PhTicket: PhosphorIcon;
  export const PhTiktokLogo: PhosphorIcon;
  export const PhTimer: PhosphorIcon;
  export const PhToggleLeft: PhosphorIcon;
  export const PhToggleRight: PhosphorIcon;
  export const PhToilet: PhosphorIcon;
  export const PhToiletPaper: PhosphorIcon;
  export const PhTote: PhosphorIcon;
  export const PhToteSimple: PhosphorIcon;
  export const PhTrademarkRegistered: PhosphorIcon;
  export const PhTrafficCone: PhosphorIcon;
  export const PhTrafficSign: PhosphorIcon;
  export const PhTrafficSignal: PhosphorIcon;
  export const PhTrain: PhosphorIcon;
  export const PhTrainRegional: PhosphorIcon;
  export const PhTrainSimple: PhosphorIcon;
  export const PhTranslate: PhosphorIcon;
  export const PhTrash: PhosphorIcon;
  export const PhTrashSimple: PhosphorIcon;
  export const PhTray: PhosphorIcon;
  export const PhTree: PhosphorIcon;
  export const PhTreeEvergreen: PhosphorIcon;
  export const PhTreeStructure: PhosphorIcon;
  export const PhTrendDown: PhosphorIcon;
  export const PhTrendUp: PhosphorIcon;
  export const PhTriangle: PhosphorIcon;
  export const PhTrophy: PhosphorIcon;
  export const PhTruck: PhosphorIcon;
  export const PhTwitchLogo: PhosphorIcon;
  export const PhTwitterLogo: PhosphorIcon;
  export const PhUmbrella: PhosphorIcon;
  export const PhUmbrellaSimple: PhosphorIcon;
  export const PhUpload: PhosphorIcon;
  export const PhUploadSimple: PhosphorIcon;
  export const PhUser: PhosphorIcon;
  export const PhUserCircle: PhosphorIcon;
  export const PhUserCircleGear: PhosphorIcon;
  export const PhUserCircleMinus: PhosphorIcon;
  export const PhUserCirclePlus: PhosphorIcon;
  export const PhUserFocus: PhosphorIcon;
  export const PhUserGear: PhosphorIcon;
  export const PhUserList: PhosphorIcon;
  export const PhUserMinus: PhosphorIcon;
  export const PhUserPlus: PhosphorIcon;
  export const PhUserRectangle: PhosphorIcon;
  export const PhUserSquare: PhosphorIcon;
  export const PhUserSwitch: PhosphorIcon;
  export const PhUsers: PhosphorIcon;
  export const PhUsersFour: PhosphorIcon;
  export const PhUsersThree: PhosphorIcon;
  export const PhVault: PhosphorIcon;
  export const PhVibrate: PhosphorIcon;
  export const PhVideoCamera: PhosphorIcon;
  export const PhVideoCameraSlash: PhosphorIcon;
  export const PhVignette: PhosphorIcon;
  export const PhVoicemail: PhosphorIcon;
  export const PhVolleyball: PhosphorIcon;
  export const PhWall: PhosphorIcon;
  export const PhWallet: PhosphorIcon;
  export const PhWarning: PhosphorIcon;
  export const PhWarningCircle: PhosphorIcon;
  export const PhWarningOctagon: PhosphorIcon;
  export const PhWatch: PhosphorIcon;
  export const PhWaveSawtooth: PhosphorIcon;
  export const PhWaveSine: PhosphorIcon;
  export const PhWaveSquare: PhosphorIcon;
  export const PhWaveTriangle: PhosphorIcon;
  export const PhWaves: PhosphorIcon;
  export const PhWebcam: PhosphorIcon;
  export const PhWhatsappLogo: PhosphorIcon;
  export const PhWheelchair: PhosphorIcon;
  export const PhWifiHigh: PhosphorIcon;
  export const PhWifiLow: PhosphorIcon;
  export const PhWifiMedium: PhosphorIcon;
  export const PhWifiNone: PhosphorIcon;
  export const PhWifiSlash: PhosphorIcon;
  export const PhWifiX: PhosphorIcon;
  export const PhWind: PhosphorIcon;
  export const PhWindowsLogo: PhosphorIcon;
  export const PhWine: PhosphorIcon;
  export const PhWrench: PhosphorIcon;
  export const PhX: PhosphorIcon;
  export const PhXCircle: PhosphorIcon;
  export const PhXSquare: PhosphorIcon;
  export const PhYinYang: PhosphorIcon;
  export const PhYoutubeLogo: PhosphorIcon;
}
declare module 'phosphor-vue/dist/esm/components/PhActivity.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAddressBook.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAirplane.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAirplaneInFlight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAirplaneLanding.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAirplaneTakeoff.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAirplaneTilt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAirplay.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlarm.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlien.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignBottom.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignBottomSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignCenterHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignCenterHorizontalSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignCenterVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignCenterVerticalSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignLeftSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignRightSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignTop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAlignTopSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAnchor.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAnchorSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAndroidLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAngularLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAperture.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAppStoreLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAppWindow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAppleLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhApplePodcastsLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArchive.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArchiveBox.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArchiveTray.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArmchair.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowArcLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowArcRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendDoubleUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendDoubleUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendDownLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendDownRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendLeftDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendLeftUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendRightDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendRightUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowBendUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleDownLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleDownRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCircleUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowClockwise.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowCounterClockwise.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowDownLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowDownRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowDownLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowDownRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowLeftDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowLeftUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowRightDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowRightUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowElbowUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLineDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLineLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLineRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLineUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLinesDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLinesLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLinesRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatLinesUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowFatUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineDownLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineDownRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowLineUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareDownLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareDownRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareIn.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareOut.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowSquareUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowUDownLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowUDownRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowULeftDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowULeftUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowURightDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowURightUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowUUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowUUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowUpLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowUpRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsClockwise.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsCounterClockwise.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsDownUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsIn.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsInCardinal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsInLineHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsInLineVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsInSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsLeftRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsOut.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsOutCardinal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsOutLineHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsOutLineVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsOutSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArrowsVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArticle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArticleMedium.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhArticleNyTimes.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAsterisk.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAsteriskSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhAtom.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBaby.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBackpack.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBackspace.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBag.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBagSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBalloon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBandaids.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBank.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBarbell.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBarcode.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBarricade.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBaseball.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBasketball.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBathtub.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryCharging.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryChargingVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryEmpty.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryFull.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryHigh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryLow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryMedium.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryWarning.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBatteryWarningVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBed.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBeerBottle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBehanceLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBell.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBellRinging.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBellSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBellSimpleRinging.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBellSimpleSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBellSimpleZ.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBellSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBellZ.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBezierCurve.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBicycle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBinoculars.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBird.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBluetooth.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBluetoothConnected.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBluetoothSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBluetoothX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBoat.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBook.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBookBookmark.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBookOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBookmark.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBookmarkSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBookmarks.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBookmarksSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBooks.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBoundingBox.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBracketsAngle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBracketsCurly.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBracketsRound.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBracketsSquare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBrain.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBrandy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBriefcase.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBriefcaseMetal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBroadcast.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBrowser.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBrowsers.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBug.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBugBeetle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBugDroid.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBuildings.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhBus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhButterfly.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCactus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCake.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCalculator.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCalendar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCalendarBlank.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCalendarCheck.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCalendarPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCalendarX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCamera.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCameraRotate.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCameraSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCampfire.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCarSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCardholder.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCards.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleDoubleDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleDoubleLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleDoubleRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleDoubleUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretCircleUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretDoubleDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretDoubleLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretDoubleRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretDoubleUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCaretUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCat.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCellSignalFull.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCellSignalHigh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCellSignalLow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCellSignalMedium.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCellSignalNone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCellSignalSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCellSignalX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChalkboard.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChalkboardSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChalkboardTeacher.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChartBar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChartBarHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChartLine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChartLineUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChartPie.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChartPieSlice.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChat.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatCentered.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatCenteredDots.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatCenteredText.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatCircleDots.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatCircleText.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatDots.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatTeardrop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatTeardropDots.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatTeardropText.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatText.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChats.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatsCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChatsTeardrop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCheck.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCheckCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCheckSquare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCheckSquareOffset.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhChecks.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleDashed.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleHalf.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleHalfTilt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleNotch.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleWavy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleWavyCheck.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleWavyQuestion.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCircleWavyWarning.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCirclesFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCirclesThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCirclesThreePlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClipboard.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClipboardText.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClock.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClockAfternoon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClockClockwise.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClockCounterClockwise.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClosedCaptioning.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloud.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudArrowDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudArrowUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudCheck.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudFog.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudLightning.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudMoon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudRain.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudSnow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCloudSun.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhClub.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCoatHanger.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCode.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCodeSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCodepenLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCodesandboxLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCoffee.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCoin.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCoinVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCoins.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhColumns.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCommand.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCompass.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhComputerTower.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhConfetti.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCookie.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCookingPot.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCopy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCopySimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCopyleft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCopyright.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCornersIn.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCornersOut.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCpu.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCreditCard.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCrop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCrosshair.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCrosshairSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCrown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCrownSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCube.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyBtc.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyCircleDollar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyCny.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyDollar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyDollarSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyEth.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyEur.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyGbp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyInr.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyJpy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyKrw.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyKzt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyNgn.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCurrencyRub.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCursor.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCursorText.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhCylinder.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDatabase.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDesktop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDesktopTower.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDetective.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDeviceMobile.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDeviceMobileCamera.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDeviceMobileSpeaker.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDeviceTablet.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDeviceTabletCamera.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDeviceTabletSpeaker.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiamond.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiamondsFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiceFive.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiceFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiceOne.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiceSix.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiceThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiceTwo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDisc.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDiscordLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDivide.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDog.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDoor.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsNine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsSix.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsSixVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsThreeCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsThreeCircleVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsThreeOutline.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsThreeOutlineVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDotsThreeVertical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDownload.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDownloadSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDribbbleLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDrop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDropHalf.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhDropHalfBottom.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEarSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEgg.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEggCrack.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEject.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEjectSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEnvelope.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEnvelopeOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEnvelopeSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEnvelopeSimpleOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEqualizer.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEquals.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEraser.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhExam.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhExport.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEye.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEyeClosed.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEyeSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEyedropper.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEyedropperSample.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhEyeglasses.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFaceMask.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFacebookLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFactory.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFaders.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFadersHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFastForward.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFastForwardCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFigmaLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFile.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileArrowDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileArrowUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileAudio.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileCloud.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileCode.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileCss.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileCsv.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileDoc.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileDotted.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileHtml.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileImage.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileJpg.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileJs.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileJsx.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileLock.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFilePdf.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFilePlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFilePng.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFilePpt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileRs.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileSearch.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileText.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileTs.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileTsx.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileVideo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileVue.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileXls.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFileZip.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFiles.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFilmScript.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFilmSlate.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFilmStrip.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFingerprint.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFingerprintSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFinnTheHuman.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFire.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFireSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFirstAid.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFirstAidKit.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFish.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFishSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlag.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlagBanner.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlagCheckered.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlame.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlashlight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlask.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFloppyDisk.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFloppyDiskBack.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlowArrow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlower.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlowerLotus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFlyingSaucer.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolder.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderDotted.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderLock.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderNotch.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderNotchMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderNotchOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderNotchPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderSimpleDotted.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderSimpleLock.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderSimpleMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderSimplePlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderSimpleStar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderSimpleUser.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderStar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolderUser.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFolders.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFootball.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhForkKnife.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFrameCorners.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFramerLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFunction.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFunnel.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhFunnelSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGameController.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGasPump.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGauge.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGear.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGearSix.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGenderFemale.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGenderIntersex.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGenderMale.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGenderNeuter.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGenderNonbinary.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGenderTransgender.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGhost.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGif.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGift.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitBranch.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitCommit.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitDiff.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitFork.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitMerge.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitPullRequest.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGithubLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitlabLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGitlabLogoSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGlobe.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGlobeHemisphereEast.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGlobeHemisphereWest.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGlobeSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGlobeStand.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGoogleChromeLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGoogleLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGooglePhotosLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGooglePlayLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGooglePodcastsLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGradient.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGraduationCap.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGraph.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhGridFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHamburger.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHand.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandEye.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandFist.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandGrabbing.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandPalm.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandPointing.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandSoap.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandWaving.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandbag.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandbagSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandsClapping.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHandshake.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHardDrive.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHardDrives.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHashStraight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeadlights.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeadphones.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeadset.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeart.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeartBreak.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeartStraight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeartStraightBreak.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHeartbeat.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHexagon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHighlighterCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHorse.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglass.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglassHigh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglassLow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglassMedium.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglassSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglassSimpleHigh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglassSimpleLow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHourglassSimpleMedium.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHouse.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHouseLine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhHouseSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhIdentificationBadge.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhIdentificationCard.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhImage.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhImageSquare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhInfinity.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhInfo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhInstagramLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhIntersect.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhJeep.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhKanban.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhKey.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhKeyReturn.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhKeyboard.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhKeyhole.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhKnife.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLadder.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLadderSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLamp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLaptop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLayout.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLeaf.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLifebuoy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLightbulb.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLightbulbFilament.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLightning.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLightningSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLineSegment.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLineSegments.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLink.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLinkBreak.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLinkSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLinkSimpleBreak.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLinkSimpleHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLinkSimpleHorizontalBreak.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLinkedinLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLinuxLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhList.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhListBullets.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhListChecks.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhListDashes.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhListNumbers.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhListPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLock.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLockKey.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLockKeyOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLockLaminated.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLockLaminatedOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLockOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLockSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhLockSimpleOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMagicWand.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMagnet.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMagnetStraight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMagnifyingGlass.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMagnifyingGlassMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMagnifyingGlassPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMapPin.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMapPinLine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMapTrifold.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMarkerCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMartini.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMaskHappy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMaskSad.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMathOperations.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMedal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMediumLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMegaphone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMegaphoneSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMessengerLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMicrophone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMicrophoneSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMicrophoneStage.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMicrosoftExcelLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMicrosoftPowerpointLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMicrosoftTeamsLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMicrosoftWordLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMinusCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMoney.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMonitor.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMonitorPlay.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMoon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMoonStars.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMountains.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMouse.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMouseSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMusicNote.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMusicNoteSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMusicNotes.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMusicNotesPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhMusicNotesSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNavigationArrow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNeedle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNewspaper.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNewspaperClipping.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNote.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNoteBlank.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNotePencil.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNotebook.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNotepad.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNotification.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleEight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleFive.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleNine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleOne.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleSeven.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleSix.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleTwo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberCircleZero.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberEight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberFive.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberNine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberOne.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSeven.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSix.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareEight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareFive.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareNine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareOne.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareSeven.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareSix.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareTwo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberSquareZero.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberTwo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNumberZero.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNut.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhNyTimesLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhOctagon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhOption.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPackage.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaintBrush.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaintBrushBroad.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaintBrushHousehold.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaintBucket.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaintRoller.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPalette.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaperPlane.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaperPlaneRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaperPlaneTilt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaperclip.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPaperclipHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhParachute.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPassword.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPath.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPause.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPauseCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPawPrint.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPeace.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPenNib.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPenNibStraight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPencil.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPencilCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPencilLine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPencilSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPencilSimpleLine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPercent.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPerson.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPersonSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPersonSimpleRun.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPersonSimpleWalk.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPerspective.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhoneCall.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhoneDisconnect.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhoneIncoming.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhoneOutgoing.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhoneSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhoneX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPhosphorLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPianoKeys.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPictureInPicture.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPill.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPinterestLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPinwheel.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPizza.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlaceholder.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlanet.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlay.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlayCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlaylist.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlug.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlugs.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlugsConnected.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlusCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPlusMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPokerChip.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPoliceCar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPolygon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPopcorn.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPower.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPrescription.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPresentation.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPresentationChart.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPrinter.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhProhibit.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhProhibitInset.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhProjectorScreen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhProjectorScreenChart.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPushPin.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPushPinSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPushPinSimpleSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPushPinSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhPuzzlePiece.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhQrCode.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhQuestion.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhQueue.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhQuotes.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRadical.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRadio.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRadioButton.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRainbow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRainbowCloud.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhReceipt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRecord.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRectangle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRecycle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRedditLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRepeat.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRepeatOnce.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRewind.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRewindCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRobot.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRocket.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRocketLaunch.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRows.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRss.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRssSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRug.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhRuler.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhScales.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhScan.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhScissors.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhScreencast.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhScribbleLoop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhScroll.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSelection.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSelectionAll.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSelectionBackground.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSelectionForeground.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSelectionInverse.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSelectionPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSelectionSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShareNetwork.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShield.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShieldCheck.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShieldCheckered.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShieldChevron.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShieldPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShieldSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShieldStar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShieldWarning.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShoppingBag.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShoppingBagOpen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShoppingCart.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShoppingCartSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShower.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShuffle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShuffleAngular.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhShuffleSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSidebar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSidebarSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSignIn.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSignOut.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSignpost.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSimCard.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSketchLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSkipBack.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSkipBackCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSkipForward.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSkipForwardCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSkull.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSlackLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSliders.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSlidersHorizontal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmiley.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmileyBlank.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmileyMeh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmileyNervous.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmileySad.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmileySticker.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmileyWink.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSmileyXEyes.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSnapchatLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSnowflake.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSoccerBall.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSortAscending.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSortDescending.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpade.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSparkle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerHigh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerLow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerNone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerSimpleHigh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerSimpleLow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerSimpleNone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerSimpleSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerSimpleX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpeakerX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpinner.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpinnerGap.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpiral.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSpotifyLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSquare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSquareHalf.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSquareHalfBottom.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSquareLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSquaresFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStack.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStackOverflowLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStackSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStamp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStar.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStarFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStarHalf.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSticker.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStop.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStopCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStorefront.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStrategy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStripeLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhStudent.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSuitcase.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSuitcaseSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSun.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSunDim.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSunHorizon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSunglasses.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSwap.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSwatches.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSword.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhSyringe.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTShirt.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTable.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTabs.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTag.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTagChevron.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTagSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTarget.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTaxi.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTelegramLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTelevision.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTelevisionSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTennisBall.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTerminal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTerminalWindow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTestTube.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextAa.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextAlignCenter.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextAlignJustify.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextAlignLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextAlignRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextBolder.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextH.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextHFive.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextHFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextHOne.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextHSix.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextHThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextHTwo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextIndent.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextItalic.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextOutdent.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextStrikethrough.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextT.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextUnderline.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTextbox.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhThermometer.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhThermometerCold.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhThermometerHot.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhThermometerSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhThumbsDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhThumbsUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTicket.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTiktokLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTimer.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhToggleLeft.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhToggleRight.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhToilet.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhToiletPaper.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTote.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhToteSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrademarkRegistered.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrafficCone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrafficSign.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrafficSignal.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrain.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrainRegional.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrainSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTranslate.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrashSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTray.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTreeEvergreen.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTreeStructure.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrendDown.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrendUp.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTriangle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTrophy.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTruck.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTwitchLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhTwitterLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUmbrella.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUmbrellaSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUpload.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUploadSimple.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUser.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserCircleGear.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserCircleMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserCirclePlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserFocus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserGear.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserList.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserMinus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserPlus.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserRectangle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserSquare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUserSwitch.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUsers.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUsersFour.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhUsersThree.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhVault.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhVibrate.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhVideoCamera.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhVideoCameraSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhVignette.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhVoicemail.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhVolleyball.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWall.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWallet.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWarning.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWarningCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWarningOctagon.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWatch.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWaveSawtooth.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWaveSine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWaveSquare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWaveTriangle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWaves.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWebcam.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWhatsappLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWheelchair.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWifiHigh.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWifiLow.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWifiMedium.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWifiNone.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWifiSlash.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWifiX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWind.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWindowsLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWine.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhWrench.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhX.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhXCircle.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhXSquare.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhYinYang.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
declare module 'phosphor-vue/dist/esm/components/PhYoutubeLogo.vue' {
  import { PhosphorIcon } from 'phosphor-vue';
  const Icon: PhosphorIcon;
  export default Icon;
}
