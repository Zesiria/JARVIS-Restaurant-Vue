<script>
    import { useReviewStore } from '@/stores/review'
    export default{
        setup(){
            const review_store = useReviewStore()
            return { review_store }
        },
        data(){
            return {
                reviews : []
            }
        },
        async mounted(){
            await this.review_store.fetch()
            this.reviews = this.review_store.getReviews
        }   
    }
</script>

<template>
    <div v-for="review in reviews">
        {{ review }}
    </div>
</template>