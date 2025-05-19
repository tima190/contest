<template>
  <a-progress :percent="30" />
  <a-row :gutter="32">
      <a-col :span="8">
        <a-card title="Математика" :bordered="false" class="bg-sky-50">
          <div>
            
            <a-button>ТЕСТ</a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Английский язык" :bordered="false" class="bg-sky-50">
          <div>
            
            <a-button>ТЕСТ</a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Биология" :bordered="false" class="bg-sky-50">
          <div>
            
            <a-button>ТЕСТ</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>
  <a-row :gutter="32" class="pt-6">
      <a-col :span="8">
        <a-card title="Математика" :bordered="false" class="bg-violet-50">
          <div>
            <a-button>КВИЗ</a-button>
            
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Английский язык" :bordered="false" class="bg-violet-50">
          <div>
            <a-button>КВИЗ</a-button>
            
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Биология" :bordered="false" class="bg-violet-50">
          <div>
            <a-button>КВИЗ</a-button>
            
          </div>
        </a-card>
      </a-col>
    </a-row>
</template>

<script setup>

</script>