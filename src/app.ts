import moment from 'moment';

/**
 * INFO: 현재 파일타임을 구한다.
 */
function getCurrentFileTime(diff: number = null) {
    return (Date.now() + (diff != null ? diff : 0)) * 1e4 + 116444736e9;
}

/**
 * INFO: 유닉스타임으로 파일타임을 계산한다.
 * @param unixtime 유닉스 타임
 */
function getFiletimeFromUnixtimeMs(unixtime: number) {
    return unixtime * 1e4 + 116444736e9;
}

/**
 * INFO: 파일타임으로 유닉스타임을 계산한다.
 * @param filetime 파일타임
 */
function getUnixtimeFromFiletime(filetime: number) {
    return Math.round((filetime - 116444736e9) / 1e4);
}

async function main(){
    //console.log(process.argv);
    if(process.argv.length < 3){
        console.log('./time_printer.exe [filetime/unixtime/format] [ms diff (default 0)]');
        process.exit(0);
    }

    let msDiff: number = 0;
    if(process.argv.length >= 4){
        msDiff = Number(process.argv[3]);
        if(isNaN(msDiff)){
            msDiff = 0;
        }
    }

    let timeType: string = process.argv[2];
    switch(timeType){
        case 'filetime': {
            let filetime: number = getCurrentFileTime();
            if(msDiff !== 0){
                let unixtime = getUnixtimeFromFiletime(filetime);
                unixtime += msDiff;
                filetime = getFiletimeFromUnixtimeMs(unixtime);
            }

            console.log(filetime);
            break;
        }
        case 'unixtime': {
            let unixtime = Date.now();
            if(msDiff !== 0){
                unixtime += msDiff;
            }
            console.log(unixtime);
            break;
        }
        case 'format': {
            console.log(moment(Date.now() + msDiff).format('YYYY-MM-DD HH:mm:ss.SSS ZZ'));
            break;
        }
        default: {
            console.log('./time_printer.exe [filetime/unixtime/format] [ms diff (default 0)]');
            process.exit(0);
        }
    }
}
main();