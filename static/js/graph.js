/**
 * Created by User on 6/7/2017.
 */
queue()
    .defer(d3.json, "/FOHealth/projects")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {
    var FOHealthProjects = projectsJson;
    FOHealthProjects.forEach(function (d) {
        d["Starters"] = +d["Starters"];
    });
    // Crossfilter instance
    var ndx = crossfilter(FOHealthProjects);

    // Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["Academic_Year"];
    });
    var CourseNameDim = ndx.dimension(function (d) {
        return d["Course"];
    });
    // var CourseStageDim = ndx.dimension(function (d) {
    //     return d["Course_Stage"];
    // });
    // var ModeGroupDim = ndx.dimension(function (d) {
    //     return d["Mode_Group"];
    // });
    // var LevelGroupDim = ndx.dimension(function (d) {
    //     return d["Level_Group"];
    // });
    // var ReasonForLeavingDim = ndx.dimension(function (d) {
    //     return d["Reason_For_Leaving"];
    // });
        var totalEnrollmentDim = ndx.dimension(function (d) {
            return d["starters"];
        });
        // var FeesDim = ndx.dimension(function (d) {
        //     return d["Fees"];
        // });
        // var GenderDim = ndx.dimension(function (d) {
        //     return d["Gender"];
        // });
        // var AgeDim = ndx.dimension(function (d) {
        //     return d["Age"];
        // });
        // var WhiteBMEDim = ndx.dimension(function (d) {
        //     return d["White_BME"];
        // });
        // var EthnicityGroupDim = ndx.dimension(function (d) {
        //     return d["Ethnicity_Group"];
        // });
        // var DisabilityDescriptionDim = ndx.dimension(function (d) {
        //     return d["Disability_Description"];
        // });
        // var DisabilityDim = ndx.dimension(function (d) {
        //     return d["Disability_YN"];
        // });
        var WithdrawalsDim = ndx.dimension(function (d) {
            return d["Withdrawals"];
        });


// Groups- calculate metrics
        var numProjectsByDate = dateDim.group();
        var numProjectsByCourseName = CourseNameDim.group();
        // var numProjectsByCourseStage = CourseStageDim.group();
        // var numProjectsByModeGroupDim = ModeGroupDim.group();
        // var numProjectsByLevelGroupDim = LevelGroupDim.group();
        // var numProjectsByReasonForLeaving = ReasonForLeavingDim.group();
        var totalEnrollment = ndx.groupAll().reduceSum(function (d) {
            return d["starters"];
        });
        // var numProjectsByGender = GenderDim.group();
        // var numProjectsByAge = AgeDim.group();
        // var numProjectsByFees = FeesDim();
        // var numProjectsByWhiteBME = WhiteBMEDim.group();
        // var numProjectsByEthnicityGroup = EthnicityGroupDim.group();
        // var numProjectsByDisabilityDescription = DisabilityDescriptionDim.group();
        // var numProjectsByDisability = DisabilityDim.group();
        var numProjectsByWithdrawals = ndx.groupAll().reduceSum(function (d) {
            return d["Withdrawals"];
        });

    //all
//         var all = ndx.groupAll();//
//         });
//     var max_course = totalEnrollmentByCourse.top(1)[0].value;
//     var minTotalEnrollment = totalEnrollmentDim.bottom(1)[0]["Starters"];
//     var maxTotalEnrollment = totalEnrollmentDim.top(1)[0]["Starters"];


// Apply DC and D3

        // Charts variables: chart binding to HTML elements by CSS ID selectors
        // Displayed in dash.html
        var selectFieldYear = dc.selectMenu('#menu-select-academic_year');
        var selectFieldCourse = dc.selectMenu('#menu-select-course');
        var totalEnrollmentND = dc.numberDisplay('#total-enrollment-nd');
        var totalWithdrawalsND = dc.numberDisplay("#total-withdrawals-nd");

        //filter
        /*These selectors filter data by:
         * - Academic Year
         * - Course
         */
        selectFieldYear
            .dimension(dateDim)
            .group(numProjectsByDate);

        selectFieldCourse
            .dimension(CourseNameDim)
            .group(numProjectsByCourseName);

        totalEnrollmentND
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) {
                return d;
            })
            .group(totalEnrollment)
            .formatNumber(d3.format(".3s"));

        totalWithdrawalsND
            .formatNumber(d3.format("d"))
            .valueAccessor(function(d){
                return d;
            })
            .group(numProjectsByWithdrawals)
            .formatNumber(d3.format(".2s"));


        dc.renderAll();

}

