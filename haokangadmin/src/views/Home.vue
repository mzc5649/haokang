<template>
  <div class="home">
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider >
        <LeftSide style="width: 100%"></LeftSide>
        </Sider>
        <Content>

            <router-view ></router-view>

        </Content>
      </Layout>
      <Footer>Footer</Footer>
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
