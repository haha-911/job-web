<template>
    <div class="menu">
        <Menu></Menu>
    </div>
    <div class="content">
        <Content></Content>
    </div>
    <div class="fixed-nav">
        <Fixednav></Fixednav>
    </div>
    <div class="footer">
        <Footer></Footer>
    </div>
</template>

<script>
import Menu from './Menu.vue'
import Content from './Content.vue'
import Footer from './Footer.vue'
import Fixednav from './Fixednav.vue'
export default { 
    components: {
        Menu,
        Content,
        Footer,
        Fixednav
    }

}
</script>

<style>
<!-- .content{
    width: 100%;
    height: auto;
    margin: auto;
} -->

.footer {
    width: 100%;
    height: 300px;
    background-color: rgb(255, 255, 255);
}

</style>