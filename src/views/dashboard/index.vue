<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #409eff">
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.userCount }}</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #67c23a">
              <i class="el-icon-s-check"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.roleCount }}</div>
              <div class="stat-label">角色总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #e6a23c">
              <i class="el-icon-menu"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.menuCount }}</div>
              <div class="stat-label">菜单总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #f56c6c">
              <i class="el-icon-document"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.logCount }}</div>
              <div class="stat-label">日志总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="16">
        <el-card>
          <div slot="header" class="card-header">
            <span>访问趋势</span>
          </div>
          <div ref="lineChart" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="card-header">
            <span>用户分布</span>
          </div>
          <div ref="pieChart" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="card-header">
            <span>操作日志</span>
            <el-button type="text" @click="goToLog">查看更多</el-button>
          </div>
          <el-table :data="recentLogs" style="width: 100%">
            <el-table-column prop="username" label="操作人" width="100" />
            <el-table-column prop="operation" label="操作内容" />
            <el-table-column prop="createTime" label="操作时间" width="160" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="card-header">
            <span>系统信息</span>
          </div>
          <div class="system-info">
            <div class="info-item">
              <span class="info-label">系统版本：</span>
              <span class="info-value">v1.0.0</span>
            </div>
            <div class="info-item">
              <span class="info-label">Vue 版本：</span>
              <span class="info-value">2.6.14</span>
            </div>
            <div class="info-item">
              <span class="info-label">Element UI：</span>
              <span class="info-value">2.15.14</span>
            </div>
            <div class="info-item">
              <span class="info-label">构建工具：</span>
              <span class="info-value">Webpack 5</span>
            </div>
            <div class="info-item">
              <span class="info-label">当前用户：</span>
              <span class="info-value">{{ name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">用户角色：</span>
              <span class="info-value">{{ roles.join(", ") }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";

export default {
  name: "Dashboard",
  data() {
    return {
      stats: {
        userCount: 128,
        roleCount: 5,
        menuCount: 23,
        logCount: 1024,
      },
      recentLogs: [
        {
          username: "admin",
          operation: "登录系统",
          createTime: "2024-01-15 10:30:00",
        },
        {
          username: "admin",
          operation: "新增用户",
          createTime: "2024-01-15 10:25:00",
        },
        {
          username: "editor",
          operation: "修改配置",
          createTime: "2024-01-15 10:20:00",
        },
        {
          username: "admin",
          operation: "删除角色",
          createTime: "2024-01-15 10:15:00",
        },
        {
          username: "editor",
          operation: "导出日志",
          createTime: "2024-01-15 10:10:00",
        },
      ],
      lineChart: null,
      pieChart: null,
    };
  },
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  mounted() {
    this.initCharts();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.lineChart) {
      this.lineChart.dispose();
    }
    if (this.pieChart) {
      this.pieChart.dispose();
    }
  },
  methods: {
    initCharts() {
      this.initLineChart();
      this.initPieChart();
    },
    initLineChart() {
      this.lineChart = echarts.init(this.$refs.lineChart);
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["访问量", "用户数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "访问量",
            type: "line",
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            areaStyle: {
              color: "rgba(64, 158, 255, 0.2)",
            },
            lineStyle: {
              color: "#409EFF",
            },
            itemStyle: {
              color: "#409EFF",
            },
          },
          {
            name: "用户数",
            type: "line",
            smooth: true,
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            areaStyle: {
              color: "rgba(103, 194, 58, 0.2)",
            },
            lineStyle: {
              color: "#67C23A",
            },
            itemStyle: {
              color: "#67C23A",
            },
          },
        ],
      };
      this.lineChart.setOption(option);
    },
    initPieChart() {
      this.pieChart = echarts.init(this.$refs.pieChart);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "用户分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "管理员" },
              { value: 735, name: "编辑" },
              { value: 580, name: "访客" },
              { value: 484, name: "普通用户" },
            ],
          },
        ],
      };
      this.pieChart.setOption(option);
    },
    handleResize() {
      if (this.lineChart) {
        this.lineChart.resize();
      }
      if (this.pieChart) {
        this.pieChart.resize();
      }
    },
    goToLog() {
      this.$router.push("/log/operation");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 0;
}

.stat-card {
  ::v-deep .el-card__body {
    padding: 20px;
  }
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 28px;
    color: #fff;
  }
}

.stat-info {
  margin-left: 15px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  width: 100%;
  height: 300px;
}

.system-info {
  .info-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .info-label {
    width: 100px;
    color: #666;
  }

  .info-value {
    color: #333;
    font-weight: 500;
  }
}
</style>
