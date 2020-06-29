<template>
  <div class="home">
    <Layout>
      <Header><div style="color: white;font-size: 18px">好康后台管理系统</div></Header>
      <Layout>
        <Sider >
        <LeftSide style="width: 100%"></LeftSide>
        </Sider>
        <Content>

            <router-view ></router-view>

        </Content>
      </Layout>
      <Footer>芜湖起飞小组</Footer>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src


import LeftSide from "@/components/LeftSide";
export default {
  name: "Home",
  components: {
    LeftSide

  }
};
</script>
